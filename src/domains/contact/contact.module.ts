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
import { LoggedUserService } from '@domains/core/logged-user/logged-user.service';
import { FileUploadResolver } from '@domains/core/file-upload.resolver';
import { MediumRepository } from '@domains/medium/medium.repository';
import { MediumService } from '@domains/medium/medium.service';
import { UserRepository } from '@domains/user/user.repository';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourceRepository } from './../source/source.repository';
import { SourceService } from './../source/source.service';

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
            UserRepository,
        ])],
    providers: [
        ContactHistoryResolver,
        ContactHistoryService,
        ContactResolver,
        ContactService,
        ContactStageService,
        ContactStatusService,
        FileUploadResolver,
        LoggedUserService,
        MediumService,
        SourceService,
    ],
    exports: [
        TypeOrmModule,
        ContactService
    ],
})
export class ContactModule { }
