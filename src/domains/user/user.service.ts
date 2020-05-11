import { RedisService } from 'nestjs-redis';
import { Injectable, Inject } from '@nestjs/common';
import bcrypt from 'bcrypt';

type User = any;

@Injectable()
export class UserService {
    private readonly users: User[];

    // @Inject(RedisService)
    // private redisService: RedisService;

    constructor(private redisService: RedisService) {
        this.users = [
            {
                id: 1,
                username: 'ale',
                password: '123456',
            }
        ];
    }

    async findOne(username: string): Promise<User | null> {
        const user = this.users.find(user => user.username === username);
        return user === -1 ? null : user;
    }

    validatePassword(token: string, password: string): boolean {
        return bcrypt.compareSync(password, token);
    }
}