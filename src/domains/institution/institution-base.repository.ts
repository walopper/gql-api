import { QueryRunner, WhereExpression } from 'typeorm';
import { SelectQueryBuilder } from '@shared/utils/select-query-builder';
import { ComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';
import { QueryWhereConditionOperator, QueryWhereHelper } from '@graphql/utils/query-where-helper';
import { QueryOrderByDirection } from '@shared/enums/query-orderby-direction.enum';
import { BaseQueryOrderByInput } from '@shared/base-classes/base-query-orderby-input';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';

export class InstitutionBaseRepository<Entity> extends BaseEntityRepository<Entity> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        const query: SelectQueryBuilder<Entity> = super.createQueryBuilder(alias, queryRunner);
        query.innerJoin(`${query.alias}.Institution`, 'institution');
        query.addSelect('institution.id');
        return query;
    }

    public queryOrderByHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: BaseQueryOrderByInput[] = [],
    ): void {
        query.innerJoin(`${alias}.Institution`, 'institution');
        super.queryOrderByHelper(query, alias, options);
    }

    public queryWhereHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        option: BaseQueryWhereInput,
        conditionOperator: QueryWhereConditionOperator = 'AND',
        whereExpression?: WhereExpression,
    ) {
        query.innerJoin(`${alias}.Institution`, 'institution');
        super.queryWhereHelper(query, alias, option, conditionOperator, whereExpression);
    }

    public queryFieldsHelperForName(alias: string, query: SelectQueryBuilder<unknown>) {
        query.addSelect('institution.name');
    }

    public queryOrderByHelperForName(
        alias: string,
        query: SelectQueryBuilder<unknown>,
        orderByDirection: QueryOrderByDirection,
    ) {
        const selectionAliasName = 'institution.name';
        query.addSelect(selectionAliasName);
        query.addOrderBy(selectionAliasName, orderByDirection);
    }

    public queryWhereHelperForName(
        alias: string,
        whereExpression: WhereExpression,
        conditionOperator: QueryWhereConditionOperator,
        whereCondition: ComparisionOperatorsInput,
    ) {
        QueryWhereHelper.applyComparisionOperator(
            whereExpression,
            'institution.name',
            conditionOperator,
            whereCondition,
        );
    }
}
