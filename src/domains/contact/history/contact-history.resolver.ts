import { Company } from '@domains/company/company.entity';
import { CompanyService } from '@domains/company/company.service';
import { Contact } from '@domains/contact/contact.entity';
import { ContactService } from '@domains/contact/contact.service';
import { Fields } from '@graphql/decorators/fields.decorator';
import { Paginate, PaginateFn } from '@graphql/libs/cursor-connection/paginate.decorator';
import { DataloaderFn, Loader } from '@graphql/libs/dataloader';
import { Inject } from '@nestjs/common';
import { Args, ID, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ContactHistoryListArgs } from './args/contact-history-list.args';
import { ContactHistory, ContactHistoryConnection } from './contact-history.entity';
import { ContactHistoryService } from './contact-history.service';
import { Source } from '@domains/source/source.entity';
import { SourceService } from '@domains/source/source.service';

@Resolver(_of => ContactHistory)
export class ContactHistoryResolver {
    @Inject()
    protected contactHistoryService: ContactHistoryService;

    @Inject()
    protected contactService: ContactService;

    @Inject()
    protected companyService: CompanyService;

    @Inject()
    protected sourceService: SourceService;

    @Query(_type => ContactHistoryConnection, { name: 'contactHistory' })
    async getContactHistory(
        @Paginate() paginate: PaginateFn<ContactHistory>,
        @Fields() fields: string[],
        @Args({ name: 'contact_id', type: () => ID }) contactId: Contact['id'],
        @Args() listArgs: ContactHistoryListArgs,
    ): Promise<[ContactHistory[], number]> {
        return paginate(pagination => {
            return this.contactHistoryService.getListAndCount(
                {
                    fields,
                    pagination,
                    where: listArgs.where,
                    orderBy: listArgs.order_by,
                },
                { contactId },
            )
        });
    }

    /**
     * Resolver for Contact field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => Contact, { name: 'contact', nullable: true })
    async getContact(
        @Loader({ typeOrm: 'Contact' }) loader: DataloaderFn<number[], Contact>,
        @Fields() fields: string[],
    ): Promise<Contact> {
        return loader(async (contacts: any[]) => {
            // const contactsIds = contacts.map(contact => contact.id);
            const contactsIds = contacts.map(contact => +contact);
            return this.contactService.getList({ fields, where: { id: { _in: contactsIds } } });
        });
    }

    /**
     * Resolver for Company field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => Company, { name: 'company', nullable: true })
    async getCompany(
        @Loader({ typeOrm: 'Company' }) loader: DataloaderFn<number[], Company>,
        @Fields() fields: string[],
    ): Promise<Company> {
        return loader(async (companiesIds: number[]) => {
            return this.companyService.getList({ fields, where: { id: { _in: companiesIds } } });
        });
    }

    /**
     * Resolver for source field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => Source, { name: 'source', nullable: true })
    async getStatus(
        @Loader({ typeOrm: 'Status' }) loader: DataloaderFn<number[], Source>,
        @Fields() fields: string[],
    ): Promise<Source> {
        return loader(async (statuses: any[]) => {
            const statusIds = statuses.map(status => +status.id)
            return this.sourceService.getList({
                fields,
                where: {
                    id: { _in: statusIds }
                }
            })
        });
    }

}
