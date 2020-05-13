import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([User, UserRepository])],
    providers: [UserService],
    exports: [TypeOrmModule, UserService],
})
export class UserModule {}
