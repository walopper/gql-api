import { SourceService } from './source.service';
import { Source } from '@domains/source/source.entity';
import { SourceRepository } from './source.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Source,
            SourceRepository,
        ])],
    providers: [
        SourceService,
    ],
    exports: [
        TypeOrmModule,
        SourceService
    ],
})
export class SourceModule { }