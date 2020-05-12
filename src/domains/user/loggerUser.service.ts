import { RedisService } from 'nestjs-redis';
import { Injectable, Inject, Scope } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';

@Injectable({ scope: Scope.REQUEST })
export class LoggerUserService {
    @InjectRepository(UserRepository)
    protected readonly repository: UserRepository;

    public constructor() {
        //console.log('LoggerUserService created', this.repository);
    }


}