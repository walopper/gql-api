import { Module } from '@nestjs/common';
import { DataloaderPlugin } from './libs/dataloader/dataloader.plugin';

@Module({
    providers: [DataloaderPlugin],
})
export class GraphQLCommonModule {}
