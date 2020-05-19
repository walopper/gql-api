import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { ContactStatus } from './contact-status.entity';

@EntityRepository(ContactStatus)
export class ContactStatusRepository extends BaseEntityRepository<ContactStatus> { }
