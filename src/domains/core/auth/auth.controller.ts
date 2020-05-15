import { Body, Controller, Post, Delete, Param, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

export interface LoginDto {
    username: string;
    password: string;
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    public login(@Body() { username, password }: LoginDto) {
        return this.authService.login(username, password);
    }

    // @Get('logout')
    // public async getUserTokens(
    //     @Param('userId') userId: number
    // ) {
    //     return await this.authService.getUserTokens(userId);
    // }

    // @Delete('userTokens/:userId')
    // public async deleteUserToken(
    //     @Param('userId') userId: number
    // ): Promise<boolean> {
    //     await this.authService.invalidateUserTokens(userId);
    //     return true;
    // } 
}
