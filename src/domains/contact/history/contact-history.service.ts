import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';
import { ContactHistory } from './contact-history.entity';
import { ContactHistoryRepository } from './contact-history.repository';

@Injectable({ scope: Scope.REQUEST }) // TODO: esto debe tner scope?
export class ContactHistoryService extends BaseEntityService<ContactHistory> {

    @InjectRepository(ContactHistoryRepository)
    protected readonly repository: ContactHistoryRepository;

}
