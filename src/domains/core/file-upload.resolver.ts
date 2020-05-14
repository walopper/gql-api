
import { ExecutionContext, mixin, NestInterceptor, Optional, UseInterceptors } from '@nestjs/common';
import { GqlExecutionContext, Mutation, Resolver, Args } from '@nestjs/graphql';


interface IField {
    name: string;
    options?: any;
}

export function GraphqlFileFieldsInterceptor(
    uploadFields: IField[],
    localOptions?: any,
) {
    class MixinInterceptor implements NestInterceptor {
        options: any = {};
        constructor(@Optional() options: any = {}) {
            this.options = { ...options, ...localOptions };
        }

        async intercept(
            context: ExecutionContext,
        ): Promise<any> {
            const ctx = GqlExecutionContext.create(context);
            const args = ctx.getArgs();

            await Promise.all(
                uploadFields.map(uploadField => {
                    const file = args[uploadField.name];
                    return file;
                }),
            );
        }
    }
    const Interceptor = mixin(MixinInterceptor);
    return Interceptor;
}

@Resolver()
export class FileUploadResolver {

    @Mutation(() => Boolean)
    @UseInterceptors(
        GraphqlFileFieldsInterceptor([
            { name: 'file' }
        ]),
    )
    async uploadFile(@Args('file') catImage1: string): Promise<boolean> {
        return true
    }

}


