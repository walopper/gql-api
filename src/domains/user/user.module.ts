import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { AuthUserService } from '@domains/core/auth-user/auth-user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),

    ],
    providers: [UserService, AuthUserService],
    exports: [TypeOrmModule, UserService],
})
export class UserModule { }
