import { Company } from '@domains/company/company.entity';
import { ContactModule } from '@domains/contact/contact.module';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '../institution/institution.entity';
import { CompanyRepository } from './company.repository';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from './company.service';

@Module({
    imports: [
        forwardRef(() => ContactModule),
        TypeOrmModule.forFeature([
            Company,
            CompanyRepository,
            Institution,
        ])],
    providers: [
        CompanyResolver,
        CompanyService,
    ],
    exports: [
        CompanyService,
        TypeOrmModule,
    ],
})
export class CompanyModule { }
