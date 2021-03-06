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
import { BaseQueryWhereInput } from './base-query-where-input';
import { ComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';
import { QueryWhereConditionOperator, QueryWhereHelper } from '@graphql/utils/query-where-helper';
import { BaseQueryOrderByInput } from './base-query-orderby-input';
import { QueryOrderByDirection } from '../enums/query-orderby-direction.enum';
import { GraphqlTypeOrmMapper } from '@graphql/utils/graphql-typeorm-mapper.util';
import { QueryOptions, QueryPaginationOptions } from '../types/query-options.type';
import { BaseRepository } from './base-repository';

export abstract class BaseEntityRepository<Entity> extends BaseRepository<Entity> {
    createQueryBuilderHelper<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        options: QueryOptions<T, U>,
        queryBuilder?: SelectQueryBuilderWrapper<Entity>,
    ): SelectQueryBuilderWrapper<Entity> {
        if (!queryBuilder) {
            queryBuilder = this.createQueryBuilder();
        }

        if (options.fields) {
            this.queryFieldsHelper(queryBuilder, queryBuilder.alias, options.fields);
        }

        if (options.pagination) {
            this.queryPaginationHelper(queryBuilder, queryBuilder.alias, options.pagination);
        }

        if (options.where) {
            this.queryWhereHelper(queryBuilder, queryBuilder.alias, options.where);
        }

        if (options.orderBy) {
            this.queryOrderByHelper(queryBuilder, queryBuilder.alias, options.orderBy);
        }

        return queryBuilder;
    }

    public queryFieldsHelper(query: SelectQueryBuilder<unknown>, alias: string, fields: string[]): void {
        for (const field of fields) {
            //Try to match entity relation
            const ormRelationMetadata = GraphqlTypeOrmMapper.mapTypeOrmRelationMetadata(this.metadata.target, field);

            if (ormRelationMetadata) {
                if (ormRelationMetadata.isOwning) {
                    query.addSelect(`${alias}.${ormRelationMetadata.joinColumns[0].propertyName}`);
                }

                continue;
            }

            //Try to match entity column
            const ormColumnMetadata = GraphqlTypeOrmMapper.mapTypeOrmColumnMetadata(this.metadata.target, field);

            if (ormColumnMetadata) {
                query.addSelect(`${alias}.${field}`);
                continue;
            }

            //Not found
            //Try to call `queryFieldsHelperFor{field}`
            const customPropertyMethodName = 'queryFieldsHelperFor' + _.capitalize(_.camelCase(field));

            if (typeof this[customPropertyMethodName] === 'function') {
                this[customPropertyMethodName](alias, query);
                continue;
            }

            throw new Error(`Could not apply ${this.metadata.targetName}.${field} selection`);
        }
    }

    public queryPaginationHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: QueryPaginationOptions,
    ): void {
        const offset = options.offset !== undefined ? options.offset : 0;
        let limit = options.limit !== undefined ? options.limit : 20;

        // console.log('PAGINATION', options);
        if (limit > 50) {
            //throw new ServerError(WHERE_INPUT.QUERY_TAKE_MAX_REACHED);
        }

        //Little hack to prevent fetching too many items when we reach the limit of an backward pagination
        if (limit === 0) {
            limit = 1;
        }

        query.skip(offset);
        query.take(limit);
    }

    public queryOrderByHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: BaseQueryOrderByInput[] = [],
    ): void {
        for (const option of options) {
            //Every option should only have one column in the object literal
            if (Object.keys(option).length !== 1) {
                //logger.error('Every option should only have one column in the object literal');
                throw Error('Test');
            }

            //Property name of orderBy option
            const orderByProperty = Object.keys(option)[0];

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
                    ) as BaseEntityRepository<unknown>;
                    const relationAliasName = `${alias}_${ormRelationMetadata.propertyName}`;
                    const relationOrderByOptions = option[orderByProperty] as BaseQueryOrderByInput;

                    query.leftJoin(`${alias}.${ormRelationMetadata.propertyName}`, relationAliasName);

                    relatedEntityRepository.queryOrderByHelper(query, relationAliasName, [relationOrderByOptions]);
                }

                continue;
            }

            //Try to match entity column
            const ormColumnMetadata = GraphqlTypeOrmMapper.mapTypeOrmColumnMetadata(
                this.metadata.target,
                orderByProperty,
            );

            if (ormColumnMetadata) {
                const orderByDirection = option[orderByProperty] as QueryOrderByDirection;
                const selectionAliasName = `${alias}.${orderByProperty}`;

                query.addSelect(selectionAliasName);
                query.addOrderBy(selectionAliasName, orderByDirection);
            }

            //Not found
            //Try to call `queryOrderByHelperFor{orderByProperty}`
            const customPropertyMethodName = 'queryOrderByHelperFor' + _.capitalize(_.camelCase(orderByProperty));
            const orderByDirection = option[orderByProperty] as QueryOrderByDirection;

            if (typeof this[customPropertyMethodName] === 'function') {
                this[customPropertyMethodName](alias, query, orderByDirection);
                continue;
            }

            throw new Error(`Could not apply ${this.metadata.targetName}.${orderByProperty} order by`);
        }
    }

    public queryWhereHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        option: BaseQueryWhereInput,
        conditionOperator: QueryWhereConditionOperator = 'AND',
        whereExpression?: WhereExpression,
    ) {
        //If the option have more than one column in the object literal then group them in an '_and' condition operator
        if (Object.keys(option).length !== 1) {
            option = {
                _and: _.map(option, (v, k) => ({ [k]: v })),
            };
        }

        const targetEntityClass = this.metadata.target;

        //Property name of orderBy option
        const whereProperty = Object.keys(option)[0];
        const whereCondition = option[whereProperty];

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

        //Not found
        //Try to call `queryWhereHelperFor${whereProperty}`
        const customPropertyMethodName = 'queryWhereHelperFor' + _.capitalize(_.camelCase(whereProperty));

        if (typeof this[customPropertyMethodName] === 'function') {
            this[customPropertyMethodName](alias, whereExpression, conditionOperator, whereCondition);
            return;
        }

        throw new Error(`Could not apply ${this.metadata.targetName}.${whereProperty} where filter`);
    }
}
