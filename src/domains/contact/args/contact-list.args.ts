import { ArgsType, Field } from '@nestjs/graphql';
import { ContactQueryOrderByInput } from '../inputs/contact-query-orderby.input';
import { ContactQueryWhereInput } from '../inputs/contact-query-where.input';
import { PaginationArgs } from '@graphql/libs/cursor-connection/connection.type';

@ArgsType()
export class ContactListArgs extends PaginationArgs {
    @Field(_type => ContactQueryWhereInput, { nullable: true })
    public where?: ContactQueryWhereInput;

    @Field(_type => [ContactQueryOrderByInput], { nullable: true })
    public order_by?: ContactQueryOrderByInput[];
}
