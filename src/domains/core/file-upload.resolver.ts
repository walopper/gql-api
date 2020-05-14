
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql/scalars/file-upload.scalar';

// interface IField {
//     name: string;
//     options?: any;
// }

// export function GraphqlFileFieldsInterceptor(
//     uploadFields: IField[],
//     localOptions?: any,
// ) {
//     class MixinInterceptor implements NestInterceptor {
//         options: any = {};
//         constructor(@Optional() options: any = {}) {
//             this.options = { ...options, ...localOptions };
//         }

//         async intercept(
//             context: ExecutionContext,
//         ): Promise<any> {
//             const ctx = GqlExecutionContext.create(context);
//             const args = ctx.getArgs();

//             await Promise.all(
//                 uploadFields.map(uploadField => {
//                     const file = args[uploadField.name];
//                     return file;
//                 }),
//             );
//         }
//     }
//     const Interceptor = mixin(MixinInterceptor);
//     return Interceptor;
// }

@Resolver()
export class FileUploadResolver {

    @Mutation(() => Boolean)
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload }) fileInput: FileUpload
    ): Promise<boolean> {
        console.log(1);;
        return true
    }

}


