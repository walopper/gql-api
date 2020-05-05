import { InputType, Field } from '@nestjs/graphql';
import { BaseQueryOrderByInput } from '../../../shared/graphql/base-classes/base-query-orderby.input';
import { QueryOrderByDirection } from '../../../shared/graphql/enums/query-orderby-direction.enum';

@InputType()
export class CompanyQueryOrderByInput extends BaseQueryOrderByInput {
    @Field(_ => QueryOrderByDirection, { nullable: true })
    name?: QueryOrderByDirection;

    @Field(_ => QueryOrderByDirection, { nullable: true })
    crm_is_active?: QueryOrderByDirection;
}
