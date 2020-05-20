import { CompanyQueryWhereInput } from '@domains/company/inputs/company-query-where.input';
import { NumberComparisionOperatorsInput, StringComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';
import { Field, InputType } from '@nestjs/graphql';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import { ContactStageQueryWhereInput } from './contact-stage-query-where.input';
import { ContactStatusQueryWhereInput } from './contact-status-query-where.input';

@InputType()
export class ContactQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _and?: [ContactQueryWhereInput];

    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    name?: StringComparisionOperatorsInput;

    @Field({ nullable: true })
    company_id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    company?: CompanyQueryWhereInput;

    @Field({ nullable: true })
    stage?: ContactStageQueryWhereInput;

    @Field({ nullable: true })
    status?: ContactStatusQueryWhereInput;
}
