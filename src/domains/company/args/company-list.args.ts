import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@graphql/libs/cursor-connection/connection.type';
import { CompanyQueryWhereInput } from '../inputs/company-query-where.input';
import { CompanyQueryOrderByInput } from '../inputs/company-query-orderby.input';

@ArgsType()
export class CompanyListArgs extends PaginationArgs {
    @Field(_type => CompanyQueryWhereInput, { nullable: true })
    public where?: CompanyQueryWhereInput;

    @Field(_type => [CompanyQueryOrderByInput], { nullable: true })
    public order_by?: CompanyQueryOrderByInput[];
}
