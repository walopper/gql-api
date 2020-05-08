import { EntityRepository, QueryRunner, WhereExpression } from 'typeorm';
import { Company } from './company.entity';
import { BaseRepository } from '../../shared/base-classes/base-repository';
import { SelectQueryBuilder } from '../../shared/utils/select-query-builder';
import { ComparisionOperatorsInput } from '../../graphql/inputs/query-where-comparision-operators.input';
import { QueryWhereConditionOperator, QueryWhereHelper } from '../../graphql/utils/query-where-helper';
import { QueryOrderByDirection } from '../../shared/enums/query-orderby-direction.enum';

@EntityRepository(Company)
export class CompanyRepository extends BaseRepository<Company> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        const query: SelectQueryBuilder<Company> = super.createQueryBuilder(alias, queryRunner);
        query.innerJoin(`${query.alias}.Institution`, 'institution');
        return query;
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
