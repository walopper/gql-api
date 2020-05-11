import { UserService } from './../../domains/user/user.service';

import { Body, Controller, Post, Get, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface LoginDTO {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService,
    ) { }

    @Post('login')
    async login(@Body() { username, password }: LoginDTO) {
        const user = await this.userService.findOne(username);
        if (!user || password !== user.password) {
            throw new ForbiddenException("Login incorrect");
        }

        // Save user data in cache storage
        this.authService.setUserDataInCache(user);

        const jwtToken = await this.authService.signPayload(user.id);

        // Save user jwt token in cache storage
        this.authService.saveUserJwtTokenInCache(user.id, jwtToken);

        return { token: jwtToken };
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

