import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';
import { ContactStage } from './contact-stage.entity';
import { ContactStageRepository } from './contact-stage.repository';


@Injectable({ scope: Scope.REQUEST })
export class ContactStageService extends BaseEntityService<ContactStage> {
    @InjectRepository(ContactStageRepository)
    protected readonly repository: ContactStageRepository;
}

