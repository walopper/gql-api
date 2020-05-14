import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@domains/user/user.repository';
import { CONTEXT, GqlExecutionContext } from '@nestjs/graphql';
import { User } from '@domains/user/user.entity';
import { RedisService } from 'nestjs-redis';

@Injectable({ scope: Scope.REQUEST })
export class AuthUserService {
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository;

    private _loggedUser: User;

    uid = Math.random();

    public constructor(@Inject(CONTEXT) context, protected readonly redisService: RedisService) {
        console.log('LoggerUserService created', this.uid);
        console.log(context.headers);
    }

    public async setCurrentUser(userId: number): Promise<void> {
        let userData = await this.getSessionData(userId);

        if (!userData) {
            userData = await this.userRepository.findOne(userId);
        } else {
            // this will fetch user data from db and update cache. This is not sync.
            this.userRepository.findOne(userId).then(this.saveSessionData);
        }

        if (userData) {
            this.loggedUser = userData;
            this.saveSessionData(userData);
        }
    }

    /**
     * Return user data from cache storage
     * @param id
     */
    public async getSessionData(id: number): Promise<User> {
        const key = this.userDataCacheKey(id);
        const client = await this.redisService.getClient();
        const cacheData = await client.get(key);

        if (!cacheData) {
            return;
        }

        let user: User;
        try {
            user = JSON.parse(cacheData) as User;
        } catch (error) {}

        return user;
    }

    /**
     * save user data un cache storage
     */
    public async saveSessionData(user: User): Promise<boolean> {
        // TODO: need to define user object type (?)
        this.loggedUser = user;
        const key = this.userDataCacheKey(user.id);
        const client = await this.redisService.getClient();
        return !!client.set(key, JSON.stringify(user), 'EX', 86400); // TODO: ttl value should be in a config file
    }

    get loggedUser() {
        return this._loggedUser;
    }

    set loggedUser(user: User) {
        this._loggedUser = user;
    }

    /**
     * Get string key for user data cache store
     * @param id
     */
    private userDataCacheKey(id: number): string {
        return `auth.${id}.data`;
    }

    //getPermissions
}
