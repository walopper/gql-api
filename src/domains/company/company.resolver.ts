import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company, CompanyConnection } from './company.entity';
import { Contact, ContactConnection } from '../contact/contact.entity';
import { ContactQueryWhereInput } from '../contact/inputs/contact-query-where.input';
import { ContactQueryOrderByInput } from '../contact/inputs/contact-query-orderby.input';
import { ContactService } from '../contact/contact.service';
import { CompanyService } from './company.service';
import { DataloaderFn, Loader } from '../../graphql/libs/dataloader';
import { Inject, Injectable } from '@nestjs/common';
import { Paginate, PaginateFn } from '../../graphql/libs/cursor-connection/paginate.decorator';
import { CompanyListArgs } from './args/company-list.args';

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
        @Args() listArgs: CompanyListArgs,
    ): Promise<[Company[], number]> {
        return paginate(pagination =>
            this.companyService.getListAndCount({
                pagination,
                where: listArgs.where,
                orderBy: listArgs.order_by,
            }),
        );
    }

    @ResolveField(type => ContactConnection, { name: 'contacts' })
    async getContacts(
        @Parent() company: Company,
        @Loader({ typeORM: true, autoRelay: true }) loader: DataloaderFn<number[], Contact[]>,
        @Args('first', { nullable: true }) first?: number,
        @Args('last', { nullable: true }) last?: number,
        @Args('before', { nullable: true }) before?: string,
        @Args('after', { nullable: true }) after?: string,
        @Args('where', { nullable: true }) where?: ContactQueryWhereInput,
        @Args('order_by', { type: () => [ContactQueryOrderByInput], nullable: true })
        orderBy?: ContactQueryOrderByInput[],
    ) {
        return [];
        return await loader(async (companiesIds: number[]) => {
            return [];
            /*
            return Promise.all(
                companiesIds.map((companyId) => {
                    where = { company_id: { _eq: companyId } };
                    return container.get(ContactService).getListAndCount({
                        pagination: { first, last, before, after },
                        where,
                        orderBy,
                    });
                }),
            );
            */
        });
    }
}
