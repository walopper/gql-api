import { ContactStatusRepository } from './status/contact-status.repository';
import { Args, ID, Query, ResolveField, Resolver, Parent } from '@nestjs/graphql';
import { Paginate, PaginateFn } from '../../graphql/libs/cursor-connection/paginate.decorator';
import { DataloaderFn, Loader } from '../../graphql/libs/dataloader';
import { Company } from '../company/company.entity';
import { Contact, ContactConnection } from './contact.entity';
import { CompanyService } from '../company/company.service';
import { Inject } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactListArgs } from './args/contact-list.args';
import { Fields } from '../../graphql/decorators/fields.decorator';
import { ContactStatus as ContactStatus } from './status/contact-status.entity';
import { ContactStatusService } from './status/contact-status.service';
//import { ServerError } from '../../utils/errorHandler';
//import { WHERE_INPUT } from '../../config/errorCodes';

@Resolver(of => Contact)
export class ContactResolver {
    @Inject()
    protected contactService: ContactService;

    @Inject()
    protected companyService: CompanyService;

    @Inject()
    protected contactStatusService: ContactStatusService;

    @Query(type => ContactConnection, { name: 'contactsByCompanyId' })
    async getCompanyContacts(
        @Paginate() paginate: PaginateFn<Contact>,
        @Fields() fields: string[],
        @Args({ name: 'company_id', type: () => ID }) companyId: Company['id'],
        @Args() listArgs: ContactListArgs,
    ): Promise<[Contact[], number]> {
        return paginate(pagination =>
            this.contactService.getListAndCount(
                {
                    fields,
                    pagination,
                    where: listArgs.where,
                    orderBy: listArgs.order_by,
                },
                { companyId },
            ),
        );
    }

    /**
     * Resolver for Company field
     * @param loader 
     * @param fields 
     */
    @ResolveField(type => Company, { name: 'company', nullable: true })
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
    @ResolveField(type => ContactStatus, { name: 'status', nullable: true })
    async getStatus(
        @Loader({ typeOrm: 'Status' }) loader: DataloaderFn<number[], ContactStatus>,
        @Fields() fields: string[],
    ): Promise<ContactStatus> {
        return loader(async (statusIds: number[]) => this.contactStatusService.getList({ fields, where: { id: { _in: statusIds } } }));
    }

}
