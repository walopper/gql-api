import { FileUploadResolver } from '@domains/core/file-upload.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyModule } from '../company/company.module';
import { Contact } from './contact.entity';
import { ContactRepository } from './contact.repository';
import { ContactResolver } from './contact.resolver';
import { ContactService } from './contact.service';
import { ContactStatus } from './status/contact-status.entity';
import { ContactStatusRepository } from './status/contact-status.repository';
import { ContactStatusService } from './status/contact-status.service';
import { ContactStageRepository } from './stage/contact-stage.repository';
import { ContactStageService } from './stage/contact-stage.service';

@Module({
    imports: [
        forwardRef(() => CompanyModule),
        TypeOrmModule.forFeature([
            Contact,
            ContactRepository,
            ContactStatus,
            ContactStatusRepository,
            ContactStageRepository,
        ])],
    providers: [
        ContactResolver,
        ContactService,
        FileUploadResolver,
        ContactStatusService,
        ContactStageService
    ],
    exports: [
        TypeOrmModule,
        ContactService
    ],
})
export class ContactModule { }
