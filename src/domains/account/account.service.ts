import { AccountRepository } from '@domains/account/account.repository';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';

@Injectable({ scope: Scope.REQUEST })
// export class AccountService extends BaseEntityService<Account> {
export class AccountService {
    @InjectRepository(AccountRepository)
    protected readonly repository: AccountRepository;

}
