import { InputType, Field } from '@nestjs/graphql';
import { BaseQueryOrderByInput } from '@shared/base-classes/base-query-orderby-input';
import { QueryOrderByDirection } from '@shared/enums/query-orderby-direction.enum';

@InputType()
export class AccountQueryOrderByInput extends BaseQueryOrderByInput {

    @Field(_type => QueryOrderByDirection, { nullable: true })
    first_name?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    last_name?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    username?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    last_login?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    created_at?: QueryOrderByDirection;

}
