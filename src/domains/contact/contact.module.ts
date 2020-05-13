import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { ContactRepository } from './contact.repository';
import { Contact } from './contact.entity';
import { CompanyModule } from '../company/company.module';
import { AuthUserModule } from '@domains/core/auth-user/auth-user.module';

@Module({
    imports: [forwardRef(() => CompanyModule), TypeOrmModule.forFeature([Contact, ContactRepository])],
    providers: [ContactResolver, ContactService],
    exports: [TypeOrmModule, ContactService],
})
export class ContactModule {}
