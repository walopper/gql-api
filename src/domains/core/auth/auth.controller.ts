import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface LoginDto {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    public login(@Body() { username, password }: LoginDto) {
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
