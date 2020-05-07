import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from './graphql/graphql.module';
import { DomainsModule } from './domains/domains.module';

@Module({
    imports: [TypeOrmModule.forRoot(), GraphQLModule, DomainsModule],
})
export class AppModule {}
