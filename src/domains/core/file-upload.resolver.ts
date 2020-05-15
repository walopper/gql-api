
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';

@Resolver()
export class FileUploadResolver {

    @Mutation(() => Boolean)
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload
    ): Promise<boolean> {
        console.log(file);
        return true
    }

}


