import { AuthService } from '@domains/core/auth/auth.service';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthRequiredMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: Function) {
        console.log('Request...');

        if (!req.headers['authorization']) {
            throw new UnauthorizedException();
        }

        const token = req.headers['authorization'].replace('Bearer ', '');

        if (!(await this.authService.validateToken(token))) {
            throw new UnauthorizedException();
        }

        next();
    }
}
