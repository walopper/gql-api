import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { Institution } from '../institution/institution.entity';
import { Contact } from '../contact/contact.entity';

@Module({
    imports: [TypeOrmModule.forFeature([CompanyRepository, Institution, Contact])],
    providers: [CompanyResolver, CompanyService],
})
export class CompanyModule {}
