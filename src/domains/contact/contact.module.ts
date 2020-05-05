import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { Company } from '../company/company.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ContactRepository, Company])],
    providers: [ContactResolver, ContactService],
})
export class ContactModule {}
