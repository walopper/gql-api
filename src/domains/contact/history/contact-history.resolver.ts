import { ContactHistoryListArgs } from './args/contact-history-list.args';
import { Contact } from '@domains/contact/contact.entity';
import { Fields } from '@graphql/decorators/fields.decorator';
import { Paginate, PaginateFn } from '@graphql/libs/cursor-connection/paginate.decorator';
import { Inject } from '@nestjs/common';
import { Args, Query, Resolver, ID } from '@nestjs/graphql';
import { ContactHistoryConnection, ContactHistory } from './contact-history.entity';
import { ContactHistoryService } from './contact-history.service';

@Resolver(_of => ContactHistory)
export class ContactHistoryResolver {
    @Inject()
    protected contactHistoryService: ContactHistoryService;

    @Query(_type => ContactHistoryConnection, { name: 'contactsByCompanyId' })
    async getContactHistory(
        @Paginate() paginate: PaginateFn<ContactHistory>,
        @Fields() fields: string[],
        @Args({ name: 'contact_id', type: () => ID }) contactId: Contact['id'],
        @Args() listArgs: ContactHistoryListArgs,
    ): Promise<[ContactHistory[], number]> {
        return paginate(pagination =>
            this.contactHistoryService.getListAndCount(
                {
                    fields,
                    pagination,
                    where: listArgs.where,
                    orderBy: listArgs.order_by,
                },
                { contactId },
            ),
        );
    }

}
