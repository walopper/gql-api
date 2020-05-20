/* eslint-disable indent */
import _ from 'lodash';
import { Brackets, getCustomRepository, getMetadataArgsStorage, SelectQueryBuilder, WhereExpression } from 'typeorm';
//import logger from './logger';
import { GraphqlTypeOrmMapper } from './graphql-typeorm-mapper.util';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import {
    ComparisionOperatorsInput,
    ComparisionOperatorsValue,
} from '../inputs/query-where-comparision-operators.input';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';

export type QueryWhereConditionOperator = 'AND' | 'OR';

export abstract class QueryWhereHelper {
    public static applyConditionOperator(
        customRepository: BaseEntityRepository<unknown>,
        query: SelectQueryBuilder<unknown>,
        alias: string,
        whereExpression: WhereExpression,
        whereProperty: string,
        whereConditions: BaseQueryWhereInput[],
        conditionOperator: QueryWhereConditionOperator,
    ): boolean {
        const whereConditionOperatorMap: ObjectLiteral = { _and: 'AND', _or: 'OR' };

        //Check if it's a condition operator
        if (!whereConditionOperatorMap[whereProperty]) {
            return false;
        }

        const whereConditionOperator = whereConditionOperatorMap[whereProperty];

        const whereBracket = new Brackets(qb =>
            whereConditions.map(condition => {
                customRepository.queryWhereHelper(query, alias, condition, whereConditionOperator, qb);
            }),
        );

        if (conditionOperator === 'AND') {
            whereExpression.andWhere(whereBracket);
        } else if (conditionOperator === 'OR') {
            whereExpression.orWhere(whereBracket);
        }

        return true;
    }

    public static applyRelationCondition(
        targetEntityClass: Function | string,
        query: SelectQueryBuilder<unknown>,
        alias: string,
        whereExpression: WhereExpression,
        whereProperty: string,
        whereCondition: BaseQueryWhereInput,
        conditionOperator: QueryWhereConditionOperator,
    ): boolean {
        //Try to match entity relation
        const ormRelationMetadata = GraphqlTypeOrmMapper.mapTypeOrmRelationMetadata(targetEntityClass, whereProperty);

        //Check if it's an entity relation
        if (!ormRelationMetadata) {
            return false;
        }

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

            query.innerJoin(`${alias}.${ormRelationMetadata.propertyName}`, relationAliasName);

            relatedEntityRepository.queryWhereHelper(
                query,
                relationAliasName,
                whereCondition,
                conditionOperator,
                whereExpression,
            );
        }

        return true;
    }

    public static applyColumnCondition(
        targetEntityClass: Function | string,
        alias: string,
        whereExpression: WhereExpression,
        whereProperty: string,
        whereCondition: ComparisionOperatorsInput,
        conditionOperator: QueryWhereConditionOperator,
    ): boolean {
        //Try to match entity column
        const ormColumnMetadata = GraphqlTypeOrmMapper.mapTypeOrmColumnMetadata(targetEntityClass, whereProperty);

        //Check if it's an entity column
        if (!ormColumnMetadata) {
            return false;
        }

        //Every option should only have one column in the object literal
        if (Object.keys(whereCondition).length !== 1) {
            //logger.error('Every option should only have one column in the object literal');
            throw Error('Test3');
        }

        const conditionField = `${alias}.${ormColumnMetadata.propertyName}`;

        this.applyComparisionOperator(whereExpression, conditionField, conditionOperator, whereCondition);

        return true;
    }

    public static applyComparisionOperator(
        whereExpression: WhereExpression,
        conditionField: string,
        conditionOperator: QueryWhereConditionOperator,
        whereCondition: ComparisionOperatorsInput,
    ): void {
        let condition;
        let params;
        const paramName = _.uniqueId('param');

        const comparisonOperator = Object.keys(whereCondition)[0] as string;
        let comparisonValue = whereCondition[comparisonOperator] as ComparisionOperatorsValue;

        //Cast boolean values to "0" and "1"
        if (typeof comparisonValue === 'boolean') {
            comparisonValue = +comparisonValue;
        }

        switch (comparisonOperator) {
            case '_eq':
                condition = `${conditionField} = :${paramName}`;
                params = { [paramName]: comparisonValue };
                break;
            case '_not_eq':
                condition = `${conditionField} != :${paramName}`;
                params = { [paramName]: comparisonValue };
                break;
            case '_in':
                condition = `${conditionField} IN(:...${paramName})`;
                params = { [paramName]: comparisonValue };
                break;
            case '_not_in':
                condition = `${conditionField} NOT IN(:...${paramName})`;
                params = { [paramName]: comparisonValue };
                break;
            case '_contains':
                condition = `${conditionField} LIKE :${paramName}`;
                params = { [paramName]: `%${comparisonValue}%` };
                break;
            case '_not_contains':
                condition = `${conditionField} NOT LIKE :${paramName}`;
                params = { [paramName]: `%${comparisonValue}%` };
                break;
            case '_starts_with':
                condition = `${conditionField} LIKE :${paramName}`;
                params = { [paramName]: `${comparisonValue}%` };
                break;
            case '_not_starts_with':
                condition = `${conditionField} NOT LIKE :${paramName}`;
                params = { [paramName]: `${comparisonValue}%` };
                break;
            case '_ends_With':
                condition = `${conditionField} LIKE :${paramName}`;
                params = { [paramName]: `%${comparisonValue}` };
                break;
            case '_not_ends_With':
                condition = `${conditionField} NOT LIKE :${paramName}`;
                params = { [paramName]: `%${comparisonValue}` };
                break;
            case '_is_null':
                if (comparisonValue) {
                    condition = `${conditionField} IS NULL`;
                } else {
                    condition = `${conditionField} IS NOT NULL`;
                }
                break;
        }

        //No condition found
        if (!condition) {
            return;
        }

        if (conditionOperator === 'AND') {
            whereExpression.andWhere(condition, params);
        } else if (conditionOperator === 'OR') {
            whereExpression.orWhere(condition, params);
        }
    }
}
