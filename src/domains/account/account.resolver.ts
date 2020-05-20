import { Account } from '@domains/account/account.entity';
import { Inject } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';

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
