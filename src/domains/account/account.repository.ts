import { Account } from '@domains/account/account.entity';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Account)
export class AccountRepository extends BaseEntityRepository<Account> { }
