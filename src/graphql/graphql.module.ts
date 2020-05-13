import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { DataloaderPlugin } from './libs/dataloader/dataloader.plugin';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import './enums';
import { formatError } from './utils/graphql-error-handler';
import { AuthRequiredMiddleware } from '@domains/core/auth/auth-required.middleware';
import { AuthModule } from '@domains/core/auth/auth.module';

@Module({
    imports: [
        NestGraphQLModule.forRoot({
            useGlobalPrefix: true,
            autoSchemaFile: process.cwd() + '/src/graphql/schema.gql',
            formatError,
        }),
        AuthModule,
    ],
    providers: [DataloaderPlugin],
})
export class GraphQLModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(AuthRequiredMiddleware).forRoutes('/graphql*');
    }
}
