import { QueryOptions } from '../types/query-options.type';
import { BaseRepository } from './base.repository';
import { SelectQueryBuilder } from '../utils/select-query-builder';
import { BaseQueryWhereInput } from '../graphql/base-classes/base-query-where-input';
import { BaseQueryOrderByInput } from '../graphql/base-classes/base-query-orderby.input';

export abstract class BaseEntityService<Entity> {
    protected abstract readonly repository: BaseRepository<Entity>;

    protected getQueryBuilder<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
    ): SelectQueryBuilder<Entity> {
        return this.repository.createQueryBuilderHelper(queryOptions);
    }

    async getListAndCount<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
    ): Promise<[Entity[], number]> {
        return this.getQueryBuilder(queryOptions).getManyAndCount();
    }

    async getList<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
    ): Promise<Entity[]> {
        return this.getQueryBuilder(queryOptions).getMany();
    }

    async getOne<T extends BaseQueryWhereInput>(queryOptions: QueryOptions<T>): Promise<Entity | undefined> {
        return this.getQueryBuilder(queryOptions).getOne();
    }
}
