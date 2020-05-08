import { EntityRepository } from 'typeorm';
import { Contact } from './contact.entity';
import { BaseRepository } from '../../shared/base-classes/base-repository';
import { QueryPaginationOptions } from '../../shared/types/query-options.type';
import { SelectQueryBuilder } from '../../shared/utils/select-query-builder';

@EntityRepository(Contact)
export class ContactRepository extends BaseRepository<Contact> {
    public queryPaginationHelper(
        query: SelectQueryBuilder<unknown>,
        alias: string,
        options: QueryPaginationOptions,
    ): void {
        super.queryPaginationHelper(query, alias, options);

        //clear offset from parent
        query.skip();

        if (options.nodeInfo && options.direction) {
            const operator = options.direction === 'forward' ? '>' : '<';
            query.andWhere(`${alias}.id ${operator} :connectionCursor`, { connectionCursor: options.nodeInfo.id });
            query.addOrderBy(`${alias}.id`, 'ASC');
        }
    }
}
