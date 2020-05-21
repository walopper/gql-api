import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';
import { ContactHistory } from './contact-history.entity';

@EntityRepository(ContactHistory)
export class ContactHistoryRepository extends BaseEntityRepository<ContactHistory> {

}
