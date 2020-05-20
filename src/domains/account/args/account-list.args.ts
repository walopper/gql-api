import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '@graphql/libs/cursor-connection/connection.type';
import { AccountQueryWhereInput } from '@domains/account/inputs/account-query-where.input';
import { AccountQueryOrderByInput } from '@domains/account/inputs/account-query-orderby.input';

@ArgsType()
export class AccountListArgs extends PaginationArgs {
    @Field(_type => AccountQueryWhereInput, { nullable: true })
    public where?: AccountQueryWhereInput;

    @Field(_type => [AccountQueryOrderByInput], { nullable: true })
    public order_by?: AccountQueryOrderByInput[];
}
