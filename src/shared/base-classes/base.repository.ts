//import { ServerError } from './../../utils/errorHandler';
//import { WHERE_INPUT } from './../../config/errorCodes';
import _ from 'lodash';
import {
    getCustomRepository,
    getMetadataArgsStorage,
    QueryRunner,
    Repository,
    SelectQueryBuilder,
    WhereExpression,
} from 'typeorm';
//import logger from '../../utils/logger';
import { SelectQueryBuilder as SelectQueryBuilderWrapper } from '../utils/select-query-builder';
import { BaseQueryWhereInput, QueryWhereInputValue } from './base-query-where.input';
import { ComparisionOperatorsInput } from '../../graphql/inputs/query-where-comparision-operators.input';
import { QueryWhereConditionOperator, QueryWhereHelper } from '../../graphql/utils/query-where-helper';
import { BaseQueryOrderByInput } from './base-query-orderby.input';
import { QueryOrderByDirection } from '../enums/query-orderby-direction.enum';
import { GraphqlTypeOrmMapper } from '../../graphql/utils/graphql-typeorm-mapper.util';
import { QueryOptions, QueryPaginationOptions } from '../types/query-options.type';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilderWrapper<Entity> {
        alias = alias || this.metadata.targetName;
        queryRunner = queryRunner || this.queryRunner;

        const query = new SelectQueryBuilderWrapper<Entity>(this.manager.connection, queryRunner);
        query.select(alias);
        query.from(this.metadata.targetName, alias);

        return query;
    }

    public createOriginalQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
        return super.createQueryBuilder(alias || this.metadata.targetName, queryRunner || this.queryRunner);
    }

    createQueryBuilderHelper<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        options: QueryOptions<T, U>,
        queryBuilder?: SelectQueryBuilderWrapper<Entity>,
    ): SelectQueryBuilderWrapper<Entity> {
        if (!queryBuilder) {
            queryBuilder = this.createQueryBuilder();
        }

        if (options.pagination) {
            this.queryPaginationHelper(queryBuilder, options.pagination);
        }

        if (options.where) {
            this.queryWhereHelper(queryBuilder, queryBuilder.alias, options.where);
        }

        if (options.orderBy) {
            this.queryOrderByHelper(queryBuilder, queryBuilder.alias, options.orderBy);
        }

        return queryBuilder;
    }

    public queryPaginationHelper(query: SelectQueryBuilder<unknown>, options: QueryPaginationOptions): void {
        // console.log('PAGINATION', options);
        if (options?.first && options.first > 100) {
            //throw new ServerError(WHERE_INPUT.QUERY_TAKE_MAX_REACHED);
        }
        query.skip(options.offset || 0);
        query.take(options.limit || 20);
    }

    public queryOrderByHelper<U extends BaseQueryOrderByInput>(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: U[] = [],
    ): void {
        for (const option of options) {
            //Every option should only have one column in the object literal
            if (Object.keys(option).length !== 1) {
                //logger.error('Every option should only have one column in the object literal');
                throw Error('Test');
            }

            //Property name of orderBy option
            const orderByProperty = (Object.keys(option)[0] as keyof U) as string;

            //Try to match entity relation
            const ormRelationMetadata = GraphqlTypeOrmMapper.mapTypeOrmRelationMetadata(
                this.metadata.target,
                orderByProperty,
            );

            if (ormRelationMetadata) {
                //Get related entity
                const relatedEntity = ormRelationMetadata.isOwning
                    ? ormRelationMetadata.inverseEntityMetadata.target
                    : ormRelationMetadata.entityMetadata.target;

                const relatedEntityRepositoryMetaData = _.find(getMetadataArgsStorage().entityRepositories, {
                    entity: relatedEntity,
                }) as { target: Function; entity: Function } | undefined;

                if (relatedEntityRepositoryMetaData) {
                    const relatedEntityRepository = getCustomRepository(
                        relatedEntityRepositoryMetaData.target,
                    ) as BaseRepository<unknown>;
                    const relationAliasName = `${alias}_${ormRelationMetadata.propertyName}`;
                    const relationOrderByOptions = option[orderByProperty] as BaseQueryOrderByInput;

                    query.leftJoin(`${alias}.${ormRelationMetadata.propertyName}`, relationAliasName);

                    relatedEntityRepository.queryOrderByHelper(query, relationAliasName, [relationOrderByOptions]);
                }
            } else {
                //Try to match entity column
                const ormColumnMetadata = GraphqlTypeOrmMapper.mapTypeOrmColumnMetadata(
                    this.metadata.target,
                    orderByProperty,
                );
                if (ormColumnMetadata) {
                    const orderByDirection = option[orderByProperty] as QueryOrderByDirection;
                    const selectionAliasName = `${alias}.${orderByProperty}`;

                    query.addSelect(`${alias}.${orderByProperty}`);

                    if (orderByDirection === QueryOrderByDirection.ASC) {
                        query.addOrderBy(selectionAliasName, 'ASC');
                    } else if (orderByDirection === QueryOrderByDirection.DESC) {
                        query.addOrderBy(selectionAliasName, 'DESC');
                    }
                }
            }
        }
    }

    public queryWhereHelper<U extends BaseQueryWhereInput>(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        option: U,
        conditionOperator: QueryWhereConditionOperator = 'AND',
        whereExpression?: WhereExpression,
    ) {
        //Every option should only have one column in the object literal
        if (Object.keys(option).length !== 1) {
            //logger.error('Every option should only have one column in the object literal');
            throw Error('Test2');
        }

        const targetEntityClass = this.metadata.target;

        //Property name of orderBy option
        const whereProperty = (Object.keys(option)[0] as keyof U) as string;
        const whereCondition = option[whereProperty] as QueryWhereInputValue;

        //Set where expression
        if (!whereExpression) {
            whereExpression = query;
        }

        //If it could apply condition operator then stop because is not a column or relation
        if (
            QueryWhereHelper.applyConditionOperator(
                this,
                query,
                alias,
                whereExpression,
                whereProperty,
                whereCondition as BaseQueryWhereInput[],
                conditionOperator,
            )
        ) {
            return;
        }

        //If it could apply a relation condition then stop because is not a column
        if (
            QueryWhereHelper.applyRelationCondition(
                targetEntityClass,
                query,
                alias,
                whereExpression,
                whereProperty,
                whereCondition as BaseQueryWhereInput,
                conditionOperator,
            )
        ) {
            return;
        }

        //If it could apply a relation condition then stop
        if (
            QueryWhereHelper.applyColumnCondition(
                targetEntityClass,
                alias,
                whereExpression,
                whereProperty,
                whereCondition as ComparisionOperatorsInput,
                conditionOperator,
            )
        ) {
            return;
        }
    }
}
