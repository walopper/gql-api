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
    company_id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    first_name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    last_name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    username?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    email?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    internal_id?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    phone?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    phone2?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    active?: BooleanComparisionOperatorsInput;
}
