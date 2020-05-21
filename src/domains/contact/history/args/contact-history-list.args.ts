import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@graphql/libs/cursor-connection/connection.type';
import { ContactQueryWhereInput } from '@domains/contact/inputs/contact-query-where.input';
import { ContactQueryOrderByInput } from '@domains/contact/inputs/contact-query-orderby.input';

@ArgsType()
export class ContactHistoryListArgs extends PaginationArgs {
    @Field(_type => ContactQueryWhereInput, { nullable: true })
    public where?: ContactQueryWhereInput;

    @Field(_type => [ContactQueryOrderByInput], { nullable: true })
    public order_by?: ContactQueryOrderByInput[];
}
