import { InputType, Field } from '@nestjs/graphql';
import { BaseQueryOrderByInput } from '@shared/base-classes/base-query-orderby-input';
import { QueryOrderByDirection } from '@shared/enums/query-orderby-direction.enum';

@InputType()
export class CompanyQueryOrderByInput extends BaseQueryOrderByInput {
    @Field(_type => QueryOrderByDirection, { nullable: true })
    name?: QueryOrderByDirection;

    @Field(_type => QueryOrderByDirection, { nullable: true })
    crm_is_active?: QueryOrderByDirection;
}
