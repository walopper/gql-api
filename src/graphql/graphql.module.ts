import { Module, MiddlewareConsumer } from '@nestjs/common';
import { DataloaderPlugin } from './libs/dataloader/dataloader.plugin';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import './enums';
import { formatError } from './utils/graphql-error-handler';
import { AuthorizationMiddleware } from '../rest/auth/auth.middlewar';

@Module({
    imports: [
        NestGraphQLModule.forRoot({
            autoSchemaFile: process.cwd() + '/src/graphql/schema.gql',
            context: ctx => {
                ctx.req.user = {
                    id: 1,
                    company_id: 1,
                };

                return ctx;
            },
            formatError
        }),
    ],
    providers: [DataloaderPlugin],
})
export class GraphQLModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(AuthorizationMiddleware)
            .forRoutes('/graphql');
    }
}
