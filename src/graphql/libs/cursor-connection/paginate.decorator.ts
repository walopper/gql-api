import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { GraphqlMetadata } from '../../utils/graphql-metadata.util';
import { createConnection, ICreateConnectionOptions } from './connection';

export const Paginate = createParamDecorator(<TNode>(data: any, ctx: ExecutionContext) => {
    const resolverData = GqlExecutionContext.create(ctx);
    const info = resolverData.getInfo();
    const { after, first, before, last } = resolverData.getArgs();

    const returnTypeName = info.returnType.toString().replace(/[^_0-9A-Za-z]/g, '');
    const objectMetadata = GraphqlMetadata.getObjectTypeMetadata(returnTypeName);

    return async (paginateFunction: PaginateLoadFn<TNode>) => {
        return createConnection({
            paginationArgs: { after, first, before, last },
            connectionClass: objectMetadata.target,
            paginate: paginateFunction,
        });
    };
});

export type PaginateLoadFn<TNode> = ICreateConnectionOptions<TNode>['paginate'];
export type PaginateFn<TNode> = (fn: PaginateLoadFn<TNode>) => Promise<[TNode[], number]>;
