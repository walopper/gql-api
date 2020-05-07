import { InputType, Field } from '@nestjs/graphql';
import { CompanyQueryOrderByInput } from '../../company/inputs/company-query-orderby.input';
import { BaseQueryOrderByInput } from '../../../shared/base-classes/base-query-orderby-input';
import { QueryOrderByDirection } from '../../../shared/enums/query-orderby-direction.enum';

@InputType()
export class ContactQueryOrderByInput extends BaseQueryOrderByInput {
    @Field(_ => QueryOrderByDirection, { nullable: true })
    name?: QueryOrderByDirection;

    @Field({ nullable: true })
    company?: CompanyQueryOrderByInput;
}
