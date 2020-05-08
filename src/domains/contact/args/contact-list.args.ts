import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../../../graphql/libs/cursor-connection/connection.type';
import { ContactQueryOrderByInput } from '../inputs/contact-query-orderby.input';
import { ContactQueryWhereInput } from '../inputs/contact-query-where.input';

@ArgsType()
export class ContactListArgs extends PaginationArgs {
    @Field(type => ContactQueryWhereInput, { nullable: true })
    public where?: ContactQueryWhereInput;

    @Field(type => [ContactQueryOrderByInput], { nullable: true })
    public order_by?: ContactQueryOrderByInput[];
}
