import { Company } from '@domains/company/company.entity';
import { CompanyService } from '@domains/company/company.service';
import { Contact } from '@domains/contact/contact.entity';
import { ContactService } from '@domains/contact/contact.service';
import { ContactHistoryListArgs } from '@domains/contact/history/args/contact-history-list.args';
import { ContactHistory, ContactHistoryConnection } from '@domains/contact/history/contact-history.entity';
import { ContactHistoryService } from '@domains/contact/history/contact-history.service';
import { Medium } from '@domains/medium/medium.entity';
import { MediumService } from '@domains/medium/medium.service';
import { Source } from '@domains/source/source.entity';
import { SourceService } from '@domains/source/source.service';
import { Fields } from '@graphql/decorators/fields.decorator';
import { Paginate, PaginateFn } from '@graphql/libs/cursor-connection/paginate.decorator';
import { DataloaderFn, Loader } from '@graphql/libs/dataloader';
import { Inject } from '@nestjs/common';
import { Args, ID, Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';

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

    @Inject()
    protected mediumService: MediumService;

    @Query(_type => ContactHistoryConnection, { name: 'contactHistory' })
    async getContactHistory(
        @Paginate() paginate: PaginateFn<ContactHistory>,
        @Fields() fields: string[],
        @Args({ name: 'contact_id', type: () => ID }) contactId: Contact['id'],
        @Args({ name: 'company_id', type: () => ID }) companyId: Company['id'],
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
                { contactId, companyId },
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
        @Parent() parent
    ): Promise<Contact> {
        return loader(async (contactsIds: number[]) => {
            return this.contactService.getList(
                {
                    fields,
                    where: { id: { _in: contactsIds } }
                },
                { companyId: parent.company_id }
            );
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
    async getSource(
        @Loader({ typeOrm: 'Source' }) loader: DataloaderFn<number[], Source>,
        @Fields() fields: string[],
    ): Promise<Source> {
        return loader(async (statuses: any[]) => {
            return this.sourceService.getList({
                fields,
                where: {
                    id: { _in: statuses }
                }
            })
        });
    }

    /**
     * Resolver for medium field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => Medium, { name: 'medium', nullable: true })
    async getMedium(
        @Loader({ typeOrm: 'Medium' }) loader: DataloaderFn<number[], Medium>,
        @Fields() fields: string[],
    ): Promise<Medium> {
        return loader(async (mediums: any[]) => {
            return this.mediumService.getList({
                fields,
                where: {
                    id: { _in: mediums }
                }
            })
        });
    }
}
