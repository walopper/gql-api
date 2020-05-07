import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';
import { CompanyRepository } from './company.repository';
import { Institution } from '../institution/institution.entity';
import { ContactModule } from '../contact/contact.module';
import { Company } from './company.entity';

@Module({
    imports: [forwardRef(() => ContactModule), TypeOrmModule.forFeature([Institution, Company, CompanyRepository])],
    providers: [CompanyResolver, CompanyService],
    exports: [TypeOrmModule, CompanyService],
})
export class CompanyModule {}
