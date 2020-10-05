import { User } from '@domains/user/user.entity';
import { UserRepository } from '@domains/user/user.repository';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedisService } from 'nestjs-redis';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class LoggedUserService {
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository;

    protected loggedUserId: number;
    protected loggedUser: User;

    public constructor(
        @Inject(REQUEST) context,
        protected readonly redisService: RedisService, //protected readonly authService: AuthService,
    ) {
        const userPayload = context.req ? context.req.user : context.user;
        this.loggedUserId = userPayload.userId;
    }

    public async hasPermission(permissionId: string): Promise<boolean> {
        return true;
    }

    public async hasFeatureAccess(featureId: string): Promise<boolean> {
        return true;
    }

    public async getUser(): Promise<User | undefined> {
        //Local cache
        if (this.loggedUser) {
            return this.loggedUser;
        }

        //Redis Cache
        const userFromSession = await this.getUserDataFromSession(this.loggedUserId);

        if (userFromSession) {
            return Object.assign(new User(), userFromSession);
        }

        const userFromDb = await this.userRepository.findOne(this.loggedUserId);

        if (!userFromDb) {
            return;
        }

        this.storeUserDataInSession(userFromDb);

        return userFromDb;
    }

    /**
     * Return user data from cache storage
     * @param id
     */
    protected async getUserDataFromSession(id: number): Promise<User | undefined> {
        const key = this.getUserSessionDataCachekey(id);
        const client = await this.redisService.getClient();
        const cacheData = await client.get(key);

        if (!cacheData) {
            return;
        }

        return JSON.parse(cacheData) as User;
    }

    /**
     * save user data un cache storage
     */
    protected async storeUserDataInSession(user: User): Promise<boolean> {
        const key = this.getUserSessionDataCachekey(user.id);
        const client = await this.redisService.getClient();

        return !!(await client.set(key, JSON.stringify(user), 'EX', 86400)); // TODO: ttl value should be in a config file
    }

    /**
     * Get string key for user data cache store
     * @param id
     */
    protected getUserSessionDataCachekey(id: number): string {
        return `auth:user:${id}:data`;
    }

    public hasInstitutionAccess(companiesIds: number[]): boolean {
        return true;
    }
}
