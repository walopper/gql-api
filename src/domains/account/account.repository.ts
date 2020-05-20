import { BaseRepository } from '@shared/base-classes/base-repository';
import { EntityRepository } from 'typeorm';
import { Account } from '@domains/account/account.entity';
import { InstitutionBaseRepository } from '@domains/institution/institution-base.repository';

@EntityRepository(Account)
export class AccountRepository extends InstitutionBaseRepository<Account> { }
