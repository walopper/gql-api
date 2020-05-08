import { UserService } from './../../domains/user/user.service';

import { Body, Controller, Post, Get, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Payload } from '@shared/types/payload';

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

        const sessionToken = this.authService.createToken(user);

        // TODO: almacenar token en redis

        const payload: Payload = {
            type: "user" //(USER, PUBLIC_API, PRIVATE_API)
            userId: user.id,
            //token: sessionToken
        };
        const jwtToken = await this.authService.signPayload(payload);
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

