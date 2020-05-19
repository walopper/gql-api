import { AuthService } from '@domains/core/auth/auth.service';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthRequiredMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) { }

    async use(req: Request, res: Response, next: Function) {
        if (!req.headers['authorization']) {
            throw new UnauthorizedException();
        }

        const token = req.headers['authorization'].replace('Bearer ', '');

        const userPayload = await this.authService.verifyToken(token);

        if (!userPayload) {
            throw new UnauthorizedException();
        }

        //@ts-ignore
        req.user = userPayload;

        next();
    }
}
