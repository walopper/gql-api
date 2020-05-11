import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function) {
        if (req.headers?.authorization) {
            return next();
        }

        // TODO validate token ?

        throw new UnauthorizedException("No autorizado!");
    }
}
