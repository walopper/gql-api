import { RedisService as NestRedisService } from 'nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
    constructor(private readonly redisService: NestRedisService) { }

    public getKey(key: string): any {

    }

    async getClient(): Promise<Redis> {
        const client = await this.redisService.getClient('test')
        return client;
    }
}