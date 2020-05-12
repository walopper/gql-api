import { QueryOptions } from '../types/query-options.type';
import { SelectQueryBuilder } from '../utils/select-query-builder';
import { BaseQueryWhereInput } from './base-query-where-input';
import { BaseQueryOrderByInput } from './base-query-orderby-input';
import { Inject } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import { BaseEntityRepository } from './base-entity-repository';

export interface BaseServiceGetMethodOptions {
    [key: string]: unknown;
}

export interface BaseServiceCreateMethodOptions {
    [key: string]: unknown;
}

export interface BaseServiceUpdateMethodOptions {
    [key: string]: unknown;
}

export abstract class BaseEntityService<
    Entity,
    ServiceGetMethodOptions extends BaseServiceGetMethodOptions = {},
    ServiceCreateMethodOptions extends BaseServiceCreateMethodOptions = {},
    ServiceUpdateMethodOptions extends BaseServiceUpdateMethodOptions = {}
> {
    protected abstract readonly repository: BaseEntityRepository<Entity>;
    protected authUser: any;

    constructor(@Inject(CONTEXT) context) {
        if (!context.req.user) {
            throw Error('Need authenticated user');
        }

        this.authUser = context.req.user;
    }
    private getQueryBuilder<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
    ): SelectQueryBuilder<Entity> {
        return this.repository.createQueryBuilderHelper(queryOptions);
    }

    protected async beforeGet<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        query: SelectQueryBuilder<Entity>,
        queryOptions: QueryOptions<T, U>,
        options: BaseServiceGetMethodOptions,
    ): Promise<void> {}

    protected async afterGet<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        query: SelectQueryBuilder<Entity>,
        queryOptions: QueryOptions<T, U>,
        options: BaseServiceGetMethodOptions,
        result: Entity[],
    ): Promise<void> {}

    public async getListAndCount<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
        options?: ServiceGetMethodOptions,
    ): Promise<[Entity[], number]> {
        const query = this.getQueryBuilder(queryOptions);

        await this.beforeGet(query, queryOptions, options);

        const result = await query.getManyAndCount();

        await this.afterGet(query, queryOptions, options, result[0]);

        return result;
    }

    public async getList<T extends BaseQueryWhereInput, U extends BaseQueryOrderByInput>(
        queryOptions: QueryOptions<T, U>,
        options?: BaseServiceGetMethodOptions,
    ): Promise<Entity[]> {
        const query = this.getQueryBuilder(queryOptions);

        await this.beforeGet(query, queryOptions, options);

        const result = await query.getMany();

        await this.afterGet(query, queryOptions, options, result);

        return result;
    }

    public async getOne<T extends BaseQueryWhereInput>(
        queryOptions: QueryOptions<T>,
        options?: BaseServiceGetMethodOptions,
    ): Promise<Entity | undefined> {
        const query = this.getQueryBuilder(queryOptions);

        await this.beforeGet(query, queryOptions, options);

        const result = await query.getOne();

        await this.afterGet(query, queryOptions, options, [result]);

        return result;
    }
}
