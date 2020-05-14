import { AuthModule } from '@domains/core/auth/auth.module';
import { DomainsModule } from '@domains/domains.module';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisUrlParse } from '@shared/utils/redis-url-parse';
import { RedisModule } from 'nestjs-redis';
import { GraphQLModule } from './graphql/graphql.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot(),
        GraphQLModule,
        DomainsModule,
        AuthModule,
        RedisModule.forRootAsync({
            useFactory: (configService: ConfigService) => {
                //Important: Cannot use 'url' property directly, because it override the other options
                return {
                    ...redisUrlParse(configService.get('REDIS_URL')),
                    maxRetriesPerRequest: 2,
                    connectTimeout: 500,
                };
            }, // or use async method
            inject: [ConfigService],
        }),
    ],
    providers: [

    ],
})
export class AppModule { }
