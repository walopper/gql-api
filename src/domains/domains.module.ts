import { Module } from '@nestjs/common';
import { ContactModule } from '@domains/contact/contact.module';
import { CompanyModule } from '@domains/company/company.module';
import { UserModule } from '@domains/user/user.module';
import { AuthModule } from '@domains/core/auth/auth.module';
import { AuthUserModule } from '@domains/core/auth-user/auth-user.module';
import { SourceModule } from '@domains/source/source.module';

@Module({
    imports: [
        AuthModule,
        AuthUserModule,
        CompanyModule,
        ContactModule,
        SourceModule,
        UserModule,
    ],
})
export class DomainsModule { }
