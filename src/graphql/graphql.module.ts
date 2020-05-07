import { Module } from '@nestjs/common';
import { DataloaderPlugin } from './libs/dataloader/dataloader.plugin';
import { GraphQLModule as NestGraphQLModule } from '@nestjs/graphql';
import './enums';

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
        }),
    ],
    providers: [DataloaderPlugin],
})
export class GraphQLModule {}
