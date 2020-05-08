import { GqlExecutionContext } from '@nestjs/graphql';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

function validateRequest(request: any): boolean {
    return !!request;
}

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext, ): boolean | Promise<boolean> {
        const req: Request = GqlExecutionContext.create(context).getContext().req;
        return validateRequest(req);
    }
}