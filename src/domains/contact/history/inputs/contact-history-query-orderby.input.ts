
import { Field, InputType } from '@nestjs/graphql';
import { BaseQueryOrderByInput } from '@shared/base-classes/base-query-orderby-input';
import { QueryOrderByDirection } from '@shared/enums/query-orderby-direction.enum';

@InputType()
export class ContactHistoryQueryOrderByInput extends BaseQueryOrderByInput {

    @Field({ nullable: true })
    status?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    name?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    lead_address?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    resource_address?: QueryOrderByDirection;

    // TODO: revisar que campos van
    // @Field(_type => QueryOrderByDirection, { nullable: true })
    // destination_address?: QueryOrderByDirection;

    // @Field(_type => QueryOrderByDirection, { nullable: true })
    // quantity?: QueryOrderByDirection;

    // @Field(_type => QueryOrderByDirection, { nullable: true })
    // direction?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    created_at?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    updated_at?: QueryOrderByDirection;
}
