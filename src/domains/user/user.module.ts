import { LoggerUserService } from './loggerUser.service';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, UserRepository]),
    ],
    providers: [UserService, LoggerUserService],
    exports: [
        TypeOrmModule,
        UserService,
        LoggerUserService
    ]
})
export class UserModule { }
