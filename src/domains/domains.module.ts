import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { CompanyModule } from './company/company.module';

@Module({
    imports: [ContactModule, CompanyModule],
})
export class DomainsModule {}
