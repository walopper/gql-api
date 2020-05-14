import { RedisService } from 'nestjs-redis';
import { Injectable, Inject, Scope } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';

type User = any;

@Injectable()
export class UserService {
    @InjectRepository(UserRepository)
    protected readonly repository: UserRepository;

    // @Inject(RedisService)
    // private redisService: RedisService;

    constructor(private redisService: RedisService) {}

    public hashPassword($string, $salt = null) {
        // $global = Configure:: read('auth.salt');
        // return sha1($global.$string.$salt);
    }
}
