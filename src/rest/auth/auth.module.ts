// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { PassportModule } from '@nestjs/passport';
// import { LocalStrategy } from './jwtstrategy';
// import { UsersModule } from 'src/domains/user/user.module';

// @Module({
//     imports: [UsersModule, PassportModule],
//     providers: [AuthService, LocalStrategy],
// })
// export class AuthModule { }

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '@//domains/user/user.module';


@Module({
    imports: [
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JwtStrategy,
    ],
})
export class AuthModule { }