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

    public hashPassword($string, $salt = null) {
        // $global = Configure:: read('auth.salt');
        // return sha1($global.$string.$salt);
    }

}