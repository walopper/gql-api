import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Loader = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        console.log('ENTRO');
        return 'WEPA';
        return GqlExecutionContext.create(ctx).getContext().user;
    }
);