import { Injectable } from '@nestjs/common';
import { Payload } from '@shared/types/payload';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { RedisService } from 'nestjs-redis';


@Injectable()
export class AuthService {
    constructor(
        private redisService: RedisService,
    ) { }

    async signPayload(userId: number) {
        const payload: Payload = {
            type: "USER",
            userId
        };
        return sign(payload, 'jwt-secret', { expiresIn: '12h' });
    }

    async validateUser({ userId }: Payload): Promise<boolean> {
        const user = this.getFromCache(userId);
        return !!user;
    }

    createToken(payload: any): string {
        return bcrypt.hashSync(JSON.stringify(payload), 10);
    }

    /**
     * save user info un cache storage
     */
    async setUserDataInCache(user: { id: number, [key: string]: any }): Promise<boolean> { // TODO: need to define user object type (?)
        const key = this.userDataCacheKey(user.id);
        const client = await this.redisService.getClient('api');
        return !!client.set(key, JSON.stringify(user), 'EX', 86400); // 1 day ttl
    }

    /**
     * save user info un cache storage
     */
    public async saveUserJwtTokenInCache(userId: number, jwtToken: string): Promise<boolean> {
        const key = this.jwtTokenCachekey(userId);
        const client = await this.redisService.getClient('api');
        return !!client.rpush(key, jwtToken);
    }

    /**
     * Return user data from cache storage
     * @param id 
     */
    private async getFromCache(id: number): Promise<any> {
        const key = this.userDataCacheKey(id);
        const client = await this.redisService.getClient('api');
        return client.get(key);
    }

    /**
     * Get string key for user data cache store
     * @param id 
     */
    private userDataCacheKey(id: number): string {
        return `auth.${id}.data`;
    }

    /**
     * Get string key for user jwtToken cache store
     * @param id 
     */
    private jwtTokenCachekey(id: number): string {
        return `auth.${id}.tokens`;
    }

}