import { Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin, GraphQLRequestListener } from 'apollo-server-plugin-base';
import Container from 'typedi';

export declare const DATALOADER_REQUEST_CONTEXT_ID: unique symbol;

@Plugin()
export class DataloaderPlugin implements ApolloServerPlugin {
    requestDidStart(request: any): GraphQLRequestListener {
        // uuid-like
        request.context[DATALOADER_REQUEST_CONTEXT_ID] = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        console.log(request.context[DATALOADER_REQUEST_CONTEXT_ID]);

        return {
            willSendResponse(request: any) {
                //Delete dataloader request container to prevent memory leak
                Container.reset(request.context[DATALOADER_REQUEST_CONTEXT_ID]);
            },
        };
    }
}
