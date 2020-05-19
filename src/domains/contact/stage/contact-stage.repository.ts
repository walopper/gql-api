import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { ContactStage } from './contact-stage.entity';

@EntityRepository(ContactStage)
export class ContactStageRepository extends BaseEntityRepository<ContactStage> { }
