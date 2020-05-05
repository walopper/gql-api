import { Args, Context, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Company } from './company.entity';
import { Contact } from '../contact/contact.entity';
import { ContactQueryWhereInput } from '../contact/inputs/contact-query-where.input';
import { ContactQueryOrderByInput } from '../contact/inputs/contact-query-orderby.input';
import { ContactService } from '../contact/contact.service';
import { CompanyQueryOrderByInput } from './inputs/company-query-orderby.input';
import { CompanyQueryWhereInput } from './inputs/company-query-where.input';
import { CompanyService } from './company.service';
import { DataloaderFn, Loader } from '../../shared/graphql/libs/dataloader';
import { Injectable } from '@nestjs/common';

@Injectable()
@Resolver(of => Company)
export class CompanyResolver {
    @Query(_ => [Company])
    async companies(
        @Context() { container }: any,
        @Args('first', { nullable: true }) first?: number,
        @Args('last', { nullable: true }) last?: number,
        @Args('before', { nullable: true }) before?: string,
        @Args('after', { nullable: true }) after?: string,
        @Args('where', { nullable: true }) where?: CompanyQueryWhereInput,
        @Args('order_by', { nullable: true }) orderBy?: CompanyQueryOrderByInput,
    ): Promise<Company[]> {
        return [];
        /*
        return container
            .get(CompanyService)
            .getListAndCount({ pagination: { first, last, before, after }, where, orderBy });

         */
    }

    @ResolveField(() => [Contact])
    async contacts(
        @Context() { container }: any,
        @Parent() company: Company,
        @Loader({ typeORM: true, autoRelay: true }) loader: DataloaderFn<number[], Contact[]>,
        @Args('first', { nullable: true }) first?: number,
        @Args('last', { nullable: true }) last?: number,
        @Args('before', { nullable: true }) before?: string,
        @Args('after', { nullable: true }) after?: string,
        @Args('where', { nullable: true }) where?: ContactQueryWhereInput,
        @Args('order_by', { nullable: true }) orderBy?: ContactQueryOrderByInput,
    ): Promise<Contact[]> {
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
