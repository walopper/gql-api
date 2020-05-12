import { User } from '@//domains/user/user.entity';
import { UserRepository } from '@//domains/user/user.repository';
import { UserService } from '@//domains/user/user.service';
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payload } from '@shared/types/payload';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository;

    @Inject()
    protected readonly redisService: RedisService;

    constructor(
        // private redisService: RedisService,
    ) { }

    public async login(username: string, password: string): Promise<ResponseToken> {
        const user = await this.userRepository.findOne({
            where: {
                username
            }
        });

        if (!user) {
            throw new NotFoundException('Login incorrect');
        }

        const isValidPassword = this.verifiUserPassword(user, password);
        if (!isValidPassword) {
            // TODO: uncomment
            // throw new NotFoundException('Login incorrect');
        }

        this.setUserDataInCache(user);  // save current user data in cache storage
        const jwtToken = await this.generateJwt(user.id);
        this.saveUserJwtTokenInCache(user.id, jwtToken); // save JWT in cache storage

        return { token: jwtToken };
    }

    /**
     * Gets user data from repo and update cache storage
     * @param userid 
     */
    public async refreshCache(userid: number): Promise<boolean> {
        const user = await this.userRepository.findOne(userid);
        return user
            ? false
            : this.setUserDataInCache(user);
    }

    /**
     * match user saved password with login password.
     * @param userModel 
     * @param loginPassword 
     */
    private verifiUserPassword(userModel: User, loginPassword: string): boolean {
        const currentHash = this.sha1(process.env.SALK + loginPassword + userModel.password_salt);
        return currentHash && currentHash === userModel.password_hash;
    }

    private sha1(str: string): string { // TODO: move this to a utils module (?)
        return crypto.createHash('sha1').update(str).digest('hex');
    }

    private async generateJwt(userId: number): Promise<string> {
        const payload: Payload = {
            type: "USER",
            userId
        };
        return sign(payload, process.env.JWT_SECRET_KEY);
    }

    /**
     * save user info un cache storage
     */
    private async setUserDataInCache(user: User): Promise<boolean> { // TODO: need to define user object type (?)
        const key = this.userDataCacheKey(user.id);
        const client = await this.redisService.getClient('api');
        return !!client.set(key, JSON.stringify(user), 'EX', 86400); // 1 day ttl
    }

    /**
     * save user info un cache storage
     */
    private async saveUserJwtTokenInCache(userId: number, jwtToken: string): Promise<boolean> {
        const key = this.jwtTokenCachekey(userId);
        const client = await this.redisService.getClient('api');
        return !!client.rpush(key, jwtToken);
    }

    /**
     * Return user data from cache storage
     * @param id 
     */
    public async getFromCache(id: number): Promise<User> {
        const key = this.userDataCacheKey(id);
        const client = await this.redisService.getClient('api');
        const cacheData = await client.get(key);

        let user: User;
        try {
            user = JSON.parse(cacheData) as User;
        } catch (error) {

        }

        return user;
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