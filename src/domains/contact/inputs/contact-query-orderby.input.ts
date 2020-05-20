
import { CompanyQueryOrderByInput } from '@domains/company/inputs/company-query-orderby.input';
import { Field, InputType } from '@nestjs/graphql';
import { BaseQueryOrderByInput } from '@shared/base-classes/base-query-orderby-input';
import { QueryOrderByDirection } from '@shared/enums/query-orderby-direction.enum';

@InputType()
export class ContactQueryOrderByInput extends BaseQueryOrderByInput {
    @Field(_type => QueryOrderByDirection, { nullable: true })
    name?: QueryOrderByDirection;

    @Field({ nullable: true })
    company?: CompanyQueryOrderByInput;
}
