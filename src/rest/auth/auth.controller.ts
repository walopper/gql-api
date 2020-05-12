import { LoggerUserService } from './../../domains/user/loggerUser.service';
import { UserService } from './../../domains/user/user.service';

import { Body, Controller, Post, Get, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Inject } from 'typedi';

export interface LoginDTO {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ) { }

    @Post('login')
    public login(@Body() { username, password }: LoginDTO) {
        return this.authService.login(username, password);
    }
}


/*
auth.{user_id}.tokens [
    jwtToken1,
    jwtToken2
]

auth.{user_id}.info {
    permisos, basic info
}
*/

