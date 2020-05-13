import { Module } from '@nestjs/common';
import { ContactModule } from './contact/contact.module';
import { CompanyModule } from './company/company.module';
import { UserModule } from '@domains/user/user.module';
import { AuthModule } from '@domains/core/auth/auth.module';
import { AuthUserModule } from '@domains/core/auth-user/auth-user.module';

@Module({
    imports: [AuthUserModule, AuthModule, ContactModule, CompanyModule, UserModule],
})
export class DomainsModule {}
