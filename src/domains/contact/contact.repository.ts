import { EntityRepository, QueryRunner } from 'typeorm';
import { Contact } from './contact.entity';
import { QueryPaginationOptions } from '../../shared/types/query-options.type';
import { SelectQueryBuilder } from '../../shared/utils/select-query-builder';
import { BaseEntityRepository } from '../../shared/base-classes/base-entity-repository';

@EntityRepository(Contact)
export class ContactRepository extends BaseEntityRepository<Contact> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        const query: SelectQueryBuilder<Contact> = super.createQueryBuilder(alias, queryRunner);

        //We always need company_id to check permissions
        query.addSelect(`${query.alias}.company_id`);

        return query;
    }

    public queryPaginationHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: QueryPaginationOptions,
    ): void {
        super.queryPaginationHelper(query, alias, options);

        if (options.nodeInfo && options.direction) {
            const operator = options.direction === 'forward' ? '>' : '<';
            query.whereForPagination(`${alias}.id ${operator} :connectionCursor`, {
                connectionCursor: options.nodeInfo.id,
            });
            query.addOrderBy(`${alias}.id`, 'ASC');
        }
    }
}
