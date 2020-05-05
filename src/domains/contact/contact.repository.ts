import { EntityRepository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { BaseRepository } from '../../shared/base-classes/base.repository';

@Injectable()
@EntityRepository(Contact)
export class ContactRepository extends BaseRepository<Contact> {}
