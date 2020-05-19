import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService, BaseServiceGetMethodOptions } from '@shared/base-classes/base-entity-service';
import { ContactStatus } from './contact-status.entity';
import { ContactStatusRepository } from './contact-status.repository';


@Injectable({ scope: Scope.REQUEST })
export class ContactStatusService extends BaseEntityService<ContactStatus> {
    @InjectRepository(ContactStatusRepository)
    protected readonly repository: ContactStatusRepository;
}

