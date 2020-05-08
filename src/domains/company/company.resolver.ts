import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company, CompanyConnection } from './company.entity';
import { Contact, ContactConnection } from '../contact/contact.entity';
import { ContactService } from '../contact/contact.service';
import { CompanyService } from './company.service';
import { DataloaderFn, Loader } from '../../graphql/libs/dataloader';
import { Inject, Injectable } from '@nestjs/common';
import { Paginate, PaginateFn } from '../../graphql/libs/cursor-connection/paginate.decorator';
import { CompanyListArgs } from './args/company-list.args';
import { ContactListArgs } from '../contact/args/contact-list.args';
import { Fields } from '../../graphql/decorators/fields.decorator';

@Injectable()
@Resolver(of => Company)
export class CompanyResolver {
    @Inject()
    protected contactService: ContactService;

    @Inject()
    protected companyService: CompanyService;

    @Query(type => CompanyConnection, { name: 'companies' })
    async getCompanies(
        @Paginate() paginate: PaginateFn<Company>,
        @Fields() fields: string[],
        @Args() args: CompanyListArgs,
    ): Promise<[Company[], number]> {
        return paginate(pagination =>
            this.companyService.getListAndCount({
                fields,
                pagination,
                where: args.where,
                orderBy: args.order_by,
            }),
        );
    }

    @ResolveField(type => ContactConnection, { name: 'contacts' })
    async getContacts(
        @Loader({ typeOrm: 'Contacts' }) loader: DataloaderFn<number[], [Contact[], number]>,
        @Paginate() paginate: PaginateFn<Contact>,
        @Fields() fields: string[],
        @Args() args: ContactListArgs,
    ): Promise<[Contact[], number]> {
        return paginate(async pagination => {
            return loader(async (companiesIds: number[]) => {
                return Promise.all(
                    companiesIds.map(companyId => {
                        args.where = { company_id: { _eq: companyId } };
                        return this.contactService.getListAndCount({
                            fields,
                            pagination,
                            where: args.where,
                            orderBy: args.order_by,
                        });
                    }),
                );
            });
        });
    }
}
