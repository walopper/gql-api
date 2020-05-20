import { Account, AccountConnection } from '@domains/account/account.entity';
import { Inject, Query } from '@nestjs/common';
import { Resolver, Args } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { Paginate, PaginateFn } from '@graphql/libs/cursor-connection/paginate.decorator';
import { Fields } from '@graphql/decorators/fields.decorator';
import { AccountListArgs } from './args/account-list.args';

@Resolver(_of => Account)
export class AccountResolver {

    @Inject()
    protected accountService: AccountService;

    // @Query(_type => AccountConnection, { name: 'accountsByCompanyId' })
    // async getCompanyAccounts(
    //     @Paginate() paginate: PaginateFn<Account>,
    //     @Fields() fields: string[],
    //     @Args() listArgs: AccountListArgs,
    // ): Promise<[Account[], number]> {
    //     return paginate(pagination =>
    //         this.accountService.getListAndCount(
    //             {
    //                 fields,
    //                 pagination,
    //                 where: listArgs.where,
    //                 orderBy: listArgs.order_by,
    //             },
    //         ),
    //     );
    // }

}
