import { SourceRepository } from './../source/source.repository';
import { SourceService } from './../source/source.service';
import { CompanyModule } from '@domains/company/company.module';
import { Contact } from '@domains/contact/contact.entity';
import { ContactRepository } from '@domains/contact/contact.repository';
import { ContactResolver } from '@domains/contact/contact.resolver';
import { ContactService } from '@domains/contact/contact.service';
import { ContactHistoryRepository } from '@domains/contact/history/contact-history.repository';
import { ContactHistoryResolver } from '@domains/contact/history/contact-history.resolver';
import { ContactHistoryService } from '@domains/contact/history/contact-history.service';
import { ContactStageRepository } from '@domains/contact/stage/contact-stage.repository';
import { ContactStageService } from '@domains/contact/stage/contact-stage.service';
import { ContactStatus } from '@domains/contact/status/contact-status.entity';
import { ContactStatusRepository } from '@domains/contact/status/contact-status.repository';
import { ContactStatusService } from '@domains/contact/status/contact-status.service';
import { FileUploadResolver } from '@domains/core/file-upload.resolver';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediumService } from '@domains/medium/medium.service';
import { MediumRepository } from '@domains/medium/medium.repository';

@Module({
    imports: [
        forwardRef(() => CompanyModule),
        TypeOrmModule.forFeature([
            Contact,
            ContactHistoryRepository,
            ContactRepository,
            ContactStageRepository,
            ContactStatus,
            ContactStatusRepository,
            MediumRepository,
            SourceRepository,
        ])],
    providers: [
        ContactHistoryService,
        ContactResolver,
        ContactHistoryResolver,
        ContactService,
        ContactStageService,
        ContactStatusService,
        FileUploadResolver,
        MediumService,
        SourceService,
    ],
    exports: [
        TypeOrmModule,
        ContactService
    ],
})
export class ContactModule { }
