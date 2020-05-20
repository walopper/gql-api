import { AccountModule } from '@domains/account/account.module';
import { Module } from '@nestjs/common';
import { ContactModule } from '@domains/contact/contact.module';
import { CompanyModule } from '@domains/company/company.module';
import { UserModule } from '@domains/user/user.module';
import { AuthModule } from '@domains/core/auth/auth.module';
import { AuthUserModule } from '@domains/core/auth-user/auth-user.module';

@Module({
    imports: [
        AuthUserModule,
        AuthModule,
        ContactModule,
        CompanyModule,
        UserModule,
        AccountModule
    ],
})
export class DomainsModule { }
