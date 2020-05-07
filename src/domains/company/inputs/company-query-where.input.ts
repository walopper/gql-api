import { InputType, Field } from '@nestjs/graphql';
import { BaseQueryWhereInput } from '../../../shared/base-classes/base-query-where.input';
import {
    BooleanComparisionOperatorsInput,
    NumberComparisionOperatorsInput,
    StringComparisionOperatorsInput,
} from '../../../graphql/inputs/query-where-comparision-operators.input';

@InputType()
export class CompanyQueryWhereInput extends BaseQueryWhereInput {
    @Field(_ => CompanyQueryWhereInput, { nullable: true })
    _and?: [CompanyQueryWhereInput];

    @Field(_ => CompanyQueryWhereInput, { nullable: true })
    _or?: [CompanyQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    crm_is_active?: BooleanComparisionOperatorsInput;
}
