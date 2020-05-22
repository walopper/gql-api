import { MediumService } from './medium.service';
import { Medium } from '@domains/medium/medium.entity';
import { MediumRepository } from './medium.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Medium,
            MediumRepository,
        ])],
    providers: [
        MediumService,
    ],
    exports: [
        TypeOrmModule,
        MediumService
    ],
})
export class MediumModule { }