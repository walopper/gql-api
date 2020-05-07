import { BaseQueryWhereInput } from '../base-classes/base-query-where.input';
import { BaseQueryOrderByInput } from '../base-classes/base-query-orderby.input';

export type QueryOptions<
    T extends BaseQueryWhereInput = BaseQueryWhereInput,
    U extends BaseQueryOrderByInput = BaseQueryOrderByInput
> = {
    pagination?: QueryPaginationOptions;
    where?: T;
    orderBy?: U[];
};

export type QueryPaginationOptions = {
    first?: number;
    last?: number;
    after?: string;
    before?: string;
    offset?: number;
    limit?: number;
};
