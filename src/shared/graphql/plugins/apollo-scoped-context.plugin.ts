import { Plugin } from '@nestjs/graphql';
import {
    ApolloServerPlugin,
    GraphQLRequestListener,
} from 'apollo-server-plugin-base';
import { ContextId, ContextIdFactory, ModuleRef, NestContainer, NestFactory } from '@nestjs/core';
import { REQUEST_CONTEXT_ID } from '@nestjs/core/router/request/request-constants';
import { Type } from '@nestjs/common';

@Plugin()
export class ApolloScopedContextPlugin implements ApolloServerPlugin {

    constructor(private moduleRef: ModuleRef) {}

    requestDidStart(request: any): GraphQLRequestListener {

        const requestId: ContextId = {id: Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)}; // uuid-like
        const moduleRef = this.moduleRef;

        //Set request context Id
        //https://github.com/nestjs/graphql/pull/782
        request.context[REQUEST_CONTEXT_ID] = requestId;

        /*
        request.context.requestId = requestId;
        request.context.container = {
            async resolve<TInput = any, TResult = TInput>(typeOrToken: Type<TInput> | string | symbol): Promise<TResult> {
            return moduleRef.resolve(typeOrToken, requestId, {strict: false});
        }};

         */

        console.log('APOLLO ContextIdFactory', ContextIdFactory.getByRequest(request.context));

        /*
        const requestId = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER); // uuid-like
        const container = const catsRepository = await this.moduleRef.resolve(RecipeService, requestId);; // get the scoped container
        container.set('requestId', requestId);
        container.set('user', { id: 1, company_id: 1 });
        return { requestId, container } as ResolverContext; // create fresh context object

        //requestContext.context.container = 1;

        console.log(requestContext);
*/
        console.log('Request started', ContextIdFactory.getByRequest(request.context));
        return {
            willSendResponse(request: any) {
                console.log('Will send response', ContextIdFactory.getByRequest(request.context));
            },
        };
    }
}