import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Container } from 'typedi';
import { DATALOADER_REQUEST_CONTEXT_ID } from './dataloader.plugin';
import { BatchLoadFn, DecoratorOptions } from './dataloader.types';
import { DataloaderFactory } from './dataloader.factory';

export const Loader = createParamDecorator(<K, V>(options: DecoratorOptions<K, V> = {}, ctx: ExecutionContext) => {
    const resolverData = GqlExecutionContext.create(ctx);
    const root = resolverData.getRoot();
    const args = resolverData.getArgs();
    const context = resolverData.getContext();
    const info = resolverData.getInfo();
    const requestId = context[DATALOADER_REQUEST_CONTEXT_ID];

    const dataloaderFactory: DataloaderFactory<K, V> = Container.of(requestId).get(DataloaderFactory);

    return async (batchFunction: BatchLoadFn<K, V>): Promise<V> => {
        const loader = dataloaderFactory.makeDefaultLoader(info, batchFunction, options);

        return loader.load(({ root, args } as unknown) as K);
    };
});
