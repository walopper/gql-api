import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@domains/user/user.repository';
import { CONTEXT, GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@domains/user/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class AuthUserService {
    //@InjectRepository(UserRepository)
    //protected readonly repository: UserRepository;

    uid = Math.random();

    public constructor(@Inject(CONTEXT) context) {
        console.log('LoggerUserService created', this.uid);
        console.log(context.headers);
    }

    /**
     * Return user data from cache storage
     * @param id
     */
    /*
    public async getFromCache(id: number): Promise<User> {
        const key = this.userDataCacheKey(id);
        const client = await this.redisService.getClient('api');
        const cacheData = await client.get(key);

        let user: User;
        try {
            user = JSON.parse(cacheData) as User;
        } catch (error) {}

        return user;
    }

     */

    /**
     * Get string key for user data cache store
     * @param id
     */
    private userDataCacheKey(id: number): string {
        return `auth.${id}.data`;
    }

    /**
     * save user info un cache storage
     */
    /*
    private async setUserDataInCache(user: User): Promise<boolean> {
        // TODO: need to define user object type (?)
        const key = this.userDataCacheKey(user.id);
        const client = await this.redisService.getClient('api');
        return !!client.set(key, JSON.stringify(user), 'EX', 86400); // 1 day ttl
    }
*/
    //getPermissions
}
