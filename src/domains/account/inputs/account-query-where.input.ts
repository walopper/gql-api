import { InputType, Field } from '@nestjs/graphql';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import {
    BooleanComparisionOperatorsInput,
    NumberComparisionOperatorsInput,
    StringComparisionOperatorsInput,
} from '@graphql/inputs/query-where-comparision-operators.input';

@InputType()
export class AccountQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => AccountQueryWhereInput, { nullable: true })
    _and?: [AccountQueryWhereInput];

    @Field(_type => AccountQueryWhereInput, { nullable: true })
    _or?: [AccountQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    crm_is_active?: BooleanComparisionOperatorsInput;
}
