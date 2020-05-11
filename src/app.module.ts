import { redisOptions } from './config/redisConnectionOptions';
import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis'
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from './graphql/graphql.module';
import { DomainsModule } from './domains/domains.module';
import { AuthModule } from './rest/auth/auth.module';
import { AppController } from './app.controller';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        GraphQLModule,
        DomainsModule,
        AuthModule,
        RedisModule.register(redisOptions)
    ],
    controllers: [AppController]
})
export class AppModule {

}
