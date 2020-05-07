import * as crypto from 'crypto';
import { Service } from 'typedi';
import { isObjectLike, default as _ } from 'lodash';
import stableStringify from 'json-stable-stringify';
import { GraphQLResolveInfo } from 'graphql';
import Dataloader, { BatchLoadFn as DataloaderBatchLoadFn, Options as DataloaderOptions } from 'dataloader';
import { GraphqlTypeOrmMapper } from '../../utils/graphql-typeorm-mapper.util';
import { BatchLoadFn, DecoratorOptions } from './dataloader.types';

interface Loaders<K, V> {
    [key: string]: Dataloader<K, V>;
}

@Service()
export class DataloaderFactory<K, V> {
    private loaders: Loaders<K, V> = {};

    public makeDefaultLoader(
        info: GraphQLResolveInfo,
        batchFunction: BatchLoadFn<K, V>,
        options: DecoratorOptions<K, V> = {},
    ) {
        const id = info.parentType.toString() + '.' + info.fieldName;

        if (!!this.loaders[id]) {
            return this.loaders[id];
        }

        options = this.getDefaultOptions(options);

        if (options.typeORM) {
            // @ts-ignore
            batchFunction = this.getTypeORMBatchFunction(info, batchFunction, options);
        } else {
            batchFunction = this.getDefaultBatchFunction(info, batchFunction, options);
        }

        return this.createDataloader(id, batchFunction, options.dataloader);
    }

    protected getDefaultBatchFunction(
        info: GraphQLResolveInfo,
        batchFunction: BatchLoadFn<K, V>,
        options: DecoratorOptions<K, V>,
    ): BatchLoadFn<K, V> {
        //Pass only the root property, remove "args"
        const wrappedBatchFunction = batchFunction;

        // @ts-ignore
        return async function<K, V>(keys: ReadonlyArray<K>) {
            const returnEntitiesKeys = _.map(keys, 'root');
            return wrappedBatchFunction(returnEntitiesKeys);
        };
    }

    protected getTypeORMBatchFunction(
        info: GraphQLResolveInfo,
        batchFunction: BatchLoadFn<K, V>,
        options: DecoratorOptions<K, V>,
    ) {
        /**
         * Create batchMappingKeys function wrapper as a helper to reduce batchFunction repetitive code
         * FROM this:
         *   return async (contacts: Contact[]) => {
         *
         *       const companiesIds = _.map(contacts, 'company_id');
         *
         *       const companies = await getRepository(Company)
         *           .createQueryBuilder("company")
         *           .where("company.id IN (:...ids)", { ids: _.uniq(companiesIds) })
         *           .getMany();
         *
         *       return companiesIds.map(id => _.find(companies, { id }));
         *   }
         *
         * TO this:
         *   return async (companiesIds: number[]) => {
         *
         *      return await getRepository(Company)
         *          .createQueryBuilder("company")
         *          .where("company.id IN (:...ids)", { ids: _.uniq(companiesIds) })
         *          .getMany();
         *   }
         */
        const pivotTableEntity: Function | undefined =
            typeof options.typeORM !== 'boolean' ? options.typeORM?.pivotTableEntity : undefined;
        let relationType: string | null = null;
        let parentRelationProperty: string | undefined;
        let returnRelationProperty: string | undefined;

        /**
         * Many to Many with Pivot Table
         * How to use?
         * @loader({typeORM: {pivotTableEntity: MessageTagPivot}})
         * [QueryBuilder].innerJoinAndMapMany('tag.MessageTagPivot', MessageTagPivot, 'pivot', 'pivot.tag_id = tag.id AND pivot.message_id IN (:...ids)', { ids: messageIds })
         */
        if (pivotTableEntity) {
            const relationMetadata = GraphqlTypeOrmMapper.mapTypeOrmRelationMetadata(
                pivotTableEntity,
                info.parentType.toString(),
            );

            const joinColumns = relationMetadata?.joinColumns;

            if (joinColumns) {
                parentRelationProperty = joinColumns[0].referencedColumn?.propertyName;
                returnRelationProperty = joinColumns[0].propertyName;
                relationType = 'ManyToMany';
            }
        }
        //NOT Many to many
        else {
            const relationMetadata = GraphqlTypeOrmMapper.mapTypeOrmRelationMetadata(
                info.parentType.toString(),
                info.fieldName,
            );

            if (relationMetadata && !relationMetadata.isManyToMany) {
                //Get relation columns for owning Entity
                if (relationMetadata.isOwning) {
                    const joinColumns = relationMetadata.joinColumns;
                    parentRelationProperty = joinColumns[0].propertyName;
                    returnRelationProperty = joinColumns[0].referencedColumn?.propertyName;
                    relationType = 'ManyToOne';
                } else if (relationMetadata.inverseRelation) {
                    const joinColumns = relationMetadata.inverseRelation.joinColumns;
                    parentRelationProperty = joinColumns[0].referencedColumn?.propertyName;
                    returnRelationProperty = joinColumns[0].propertyName;
                    relationType = 'OneToMany';
                }
            }
        }

        //Return default batch function
        if (!relationType || !parentRelationProperty || !returnRelationProperty) {
            return this.getDefaultBatchFunction(info, batchFunction, options);
        }

        const wrappedBatchFunction = batchFunction;

        return async function<K, V>(keys: ReadonlyArray<K>) {
            const returnEntitiesKeys = _.map(keys, `root.${parentRelationProperty}`);
            const uniqueReturnEntitiesKeys = _.uniq(returnEntitiesKeys);
            const result = await wrappedBatchFunction(uniqueReturnEntitiesKeys);

            //AutoRelay
            if (options.autoRelay) {
                const uniqueReturnEntitiesKeysMap = _.invert(uniqueReturnEntitiesKeys);
                return returnEntitiesKeys.map(key => {
                    return result[uniqueReturnEntitiesKeysMap[key] as any];
                });
            }

            //ManyToOne
            if (relationType === 'ManyToOne') {
                return returnEntitiesKeys.map(key => _.find(result, { [returnRelationProperty as string]: key }));
            }
            //ManyToMany
            else if (relationType === 'ManyToMany' && pivotTableEntity) {
                //MessageTagPivot
                return returnEntitiesKeys.map(key => {
                    return _.filter(result, (e: ObjectLiteral) => {
                        return _.find(e[pivotTableEntity.name], {
                            [returnRelationProperty as string]: key,
                        });
                    });
                });
            }
            //OneToMany
            else {
                return returnEntitiesKeys.map(key => _.filter(result, { [returnRelationProperty as string]: key }));
            }
        };
    }

    protected getDefaultOptions(options: DecoratorOptions<K, V> = {}): DecoratorOptions<K, V> {
        if (!options) {
            options = {};
        }

        if (!options.dataloader) {
            options.dataloader = {};
        }

        if (!options.dataloader.cacheKeyFn) {
            //Set default cache key function
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.dataloader.cacheKeyFn = (key: any) => {
                //Cache key for objects
                if (isObjectLike(key)) {
                    key = stableStringify(key);
                    key = crypto
                        .createHash('sha256')
                        .update(key)
                        .digest('base64');
                }

                return key;
            };
        }

        return options;
    }

    protected createDataloader(id: string, batchFunction: BatchLoadFn<K, V>, options: DataloaderOptions<K, V> = {}) {
        // @ts-ignore
        const loader = new Dataloader<K, V>(batchFunction as DataloaderBatchLoadFn<K, V>, options);
        this.loaders[id] = loader;
        return loader;
    }
}
