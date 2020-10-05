import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { LoggedUserService } from '@domains/core/logged-user/logged-user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),

    ],
    providers: [UserService, LoggedUserService],
    exports: [TypeOrmModule, UserService],
})
export class UserModule { }
