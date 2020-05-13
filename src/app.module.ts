import { Module } from '@nestjs/common';
import { RedisModule } from 'nestjs-redis';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from './graphql/graphql.module';
import { DomainsModule } from '@domains/domains.module';
import { AuthModule } from '@domains/core/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { redisUrlParse } from '@shared/utils/redis-url-parse';

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
})
export class AppModule {}
