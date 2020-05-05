import { Module } from '@nestjs/common';
import { ApolloScopedContextPlugin } from './plugins/apollo-scoped-context.plugin';
import { Loader } from './decorators/dataloader.decorator';

@Module({
    providers: [ApolloScopedContextPlugin],
})
export class GraphQLCommonModule {}
