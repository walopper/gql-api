import { ValidationPipe } from './../../shared/utils/validation.pipe';
import { Company } from '@domains/company/company.entity';
import { CompanyService } from '@domains/company/company.service';
import { ContactListArgs } from '@domains/contact/args/contact-list.args';
import { Contact, ContactConnection } from '@domains/contact/contact.entity';
import { ContactService } from '@domains/contact/contact.service';
import { ContactHistoryListArgs } from '@domains/contact/history/args/contact-history-list.args';
import { ContactHistory, ContactHistoryConnection } from '@domains/contact/history/contact-history.entity';
import { ContactHistoryService } from '@domains/contact/history/contact-history.service';
import { ContactStage } from '@domains/contact/stage/contact-stage.entity';
import { ContactStageService } from '@domains/contact/stage/contact-stage.service';
import { ContactStatus as ContactStatus } from '@domains/contact/status/contact-status.entity';
import { ContactStatusService } from '@domains/contact/status/contact-status.service';
import { Fields } from '@graphql/decorators/fields.decorator';
import { Paginate, PaginateFn } from '@graphql/libs/cursor-connection/paginate.decorator';
import { DataloaderFn, Loader } from '@graphql/libs/dataloader';
import { Inject, UsePipes } from '@nestjs/common';
import { Args, ID, Query, ResolveField, Resolver } from '@nestjs/graphql';

@Resolver(of => Contact)
export class ContactResolver {
    @Inject()
    protected contactService: ContactService;

    @Inject()
    protected companyService: CompanyService;

    @Inject()
    protected contactStatusService: ContactStatusService;

    @Inject()
    protected contactStageService: ContactStageService;

    @Inject()
    protected contactHistoryService: ContactHistoryService;

    @Query(_type => ContactConnection, { name: 'contactsByCompanyId' })
    @UsePipes(ValidationPipe)
    async getCompanyContacts(
        @Paginate() paginate: PaginateFn<Contact>,
        @Fields() fields: string[],
        @Args({ name: 'company_id', type: () => ID }) companyId: Company['id'],
        @Args() listArgs: ContactListArgs,
    ): Promise<[Contact[], number]> {
        return paginate(pagination => {
            return this.contactService.getListAndCount(
                {
                    fields,
                    pagination,
                    where: listArgs.where,
                    orderBy: listArgs.order_by,
                },
                { companyId },
            )
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
     * Resolver for status field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => ContactStatus, { name: 'status', nullable: true })
    async getStatus(
        @Loader({ typeOrm: 'Status' }) loader: DataloaderFn<number[], ContactStatus>,
        @Fields() fields: string[],
    ): Promise<ContactStatus> {
        return loader(async (statusIds: number[]) => this.contactStatusService.getList({ fields, where: { id: { _in: statusIds } } }));
    }

    /**
     * Resolver for stage field
     * @param loader 
     * @param fields 
     */
    @ResolveField(_type => ContactStage, { name: 'stage', nullable: true })
    async getStage(
        @Loader({ typeOrm: 'Stage' }) loader: DataloaderFn<number[], ContactStage>,
        @Fields() fields: string[],
    ): Promise<ContactStage> {
        return loader(async (stageIds: number[]) => this.contactStageService.getList({ fields, where: { id: { _in: stageIds } } }));
    }

    /**
     * resolver for contact history
     * @param loader 
     * @param paginate 
     * @param fields 
     * @param args 
     */
    @ResolveField(_type => ContactHistoryConnection, { name: 'history', nullable: true })
    async getContactHistory(
        @Loader({ typeOrm: 'ContactHistory' }) loader: DataloaderFn<number[], [ContactHistory[], number]>,
        @Paginate() paginate: PaginateFn<ContactHistory>,
        @Fields() fields: string[],
        @Args() args: ContactHistoryListArgs,
    ): Promise<[ContactHistory[], number]> {
        return paginate(async pagination =>
            loader(async (contacts: number[]) => {
                return Promise.all(
                    contacts.map(contact => {
                        //@ts-ignore
                        args.where = { contact_id: { _eq: contact.id } };
                        return this.contactHistoryService.getListAndCount(
                            {
                                fields,
                                pagination,
                                where: args.where,
                                orderBy: args.order_by,
                            },
                            //@ts-ignore
                            { contactId: contact.id }
                        );
                    }),
                )
            })
        )
    }

}
