import { InputType, Field } from '@nestjs/graphql';
import { CompanyQueryWhereInput } from '../../company/inputs/company-query-where.input';
import { BaseQueryWhereInput } from '../../../shared/base-classes/base-query-where.input';
import {
    NumberComparisionOperatorsInput,
    StringComparisionOperatorsInput,
} from '../../../graphql/inputs/query-where-comparision-operators.input';

@InputType()
export class ContactQueryWhereInput extends BaseQueryWhereInput {
    @Field(_ => [ContactQueryWhereInput], { nullable: true })
    _and?: [ContactQueryWhereInput];

    @Field(_ => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    company_id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    company?: CompanyQueryWhereInput;
}
