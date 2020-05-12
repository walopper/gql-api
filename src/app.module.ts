import { redisOptions } from './config/redisConnectionOptions';
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis'
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from './graphql/graphql.module';
import { DomainsModule } from './domains/domains.module';
import { AuthModule } from './rest/auth/auth.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule,
        DomainsModule,
        AuthModule,
        RedisModule.register(redisOptions)
    ],
    controllers: []
})
export class AppModule {

}
