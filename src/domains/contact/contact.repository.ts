import { EntityRepository } from 'typeorm';
import { Contact } from './contact.entity';
import { BaseRepository } from '../../shared/base-classes/base-repository';

@EntityRepository(Contact)
export class ContactRepository extends BaseRepository<Contact> {}
