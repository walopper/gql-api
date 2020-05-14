import { User } from '@domains/user/user.entity';
import { UserRepository } from '@domains/user/user.repository';
import { UserService } from '@domains/user/user.service';
import { Injectable, NotFoundException, Inject, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import crypto from 'crypto';
import { RedisService } from 'nestjs-redis';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@domains/core/auth/types/token-payload';
import { AuthUserService } from '../auth-user/auth-user.service';

@Injectable()
export class AuthService {
    @InjectRepository(UserRepository)
    protected readonly userRepository: UserRepository;

    protected readonly SESSION_TOKEN_LIFETIME = 30 * 86400 * 1000; //30 days // TODO move to config file

    constructor(
        private readonly jwtService: JwtService,
        protected readonly redisService: RedisService,
        protected readonly authUserService: AuthUserService,
        protected readonly userService: UserService,
    ) { }

    public async login(username: string, password: string): Promise<ResponseToken> {
        //Get user using username
        const user = await this.userRepository.findOne({
            where: {
                username: username,
                //is_active: true
            },
        });

        if (!user) {
            throw new UnauthorizedException('Login incorrect');
        }

        //Validate password
        const isValidPassword = this.verifyUserPassword(user, password);

        if (!isValidPassword) {
            // TODO: uncomment
            // throw new NotFoundException('Login incorrect');
        }

        const jwtToken = await this.generateUserSession(user.id);

        return { token: jwtToken };
    }

    public async validateToken(token: string): Promise<boolean> {
        let payload;

        try {
            payload = this.jwtService.verify(token) as TokenPayload;
        } catch (e) {
            //Invalid token
            return false;
        }

        if (payload.type === 'USER') {
            //Token doesn't exists on user session
            if (!(await this.verifyUserTokenInSession(payload.userId, token))) {
                return false;
            }
        } else if (payload.type === 'INTERNAL') {
            //TODO: Implementar logica de authentification para internal services
        }
        //Invalid payload type
        else {
            return false;
        }

        // sets userData in authUserService state
        await this.authUserService.setCurrentUser(payload.userId);

        return true;
    }

    /**
     * match user saved password with login password.
     * @param userModel
     * @param loginPassword
     */
    private verifyUserPassword(userModel: User, loginPassword: string): boolean {
        const currentHash = this.sha1(process.env.SALK + loginPassword + userModel.password_salt);
        return currentHash && currentHash === userModel.password_hash;
    }

    private sha1(str: string): string {
        // TODO: move this to a utils module (?)
        return crypto
            .createHash('sha1')
            .update(str)
            .digest('hex');
    }

    /**
     * Generates a JWT and save in cache
     * @param userId 
     */
    private async generateUserSession(userId: number): Promise<string> {
        const token = await this.generateUserToken(userId);
        await this.saveUserTokenInSession(userId, token);
        return token;
    }

    private async generateUserToken(userId: number): Promise<string> {
        const payload: TokenPayload = {
            type: 'USER',
            userId: userId,
        };

        return this.jwtService.sign(payload);
    }

    /**
     * save user token in cache
     */
    private async saveUserTokenInSession(userId: number, token: string): Promise<void> {
        const key = this.getUserSessionTokenCachekey(userId);
        const client = await this.redisService.getClient();
        await client.hset(key, token, Date.now());
    }

    private async verifyUserTokenInSession(userId: number, token: string): Promise<boolean> {
        const key = this.getUserSessionTokenCachekey(userId);
        const client = await this.redisService.getClient();
        const tokenTime = +(await client.hget(key, token));

        //Token was not found in session
        if (!tokenTime) {
            return false;
        }

        //Token expired
        if (tokenTime + this.SESSION_TOKEN_LIFETIME < Date.now()) {
            await client.hdel(key, token);
            return false;
        }



        return true;
    }

    /**
     * Get string key for user jwtToken cache store
     * @param id
     */
    private getUserSessionTokenCachekey(id: number): string {
        return `auth:user:${id}:tokens`;
    }
}
