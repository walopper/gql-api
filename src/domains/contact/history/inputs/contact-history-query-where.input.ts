import { CompanyQueryWhereInput } from '@domains/company/inputs/company-query-where.input';
import { NumberComparisionOperatorsInput, StringComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';
import { Field, InputType } from '@nestjs/graphql';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import { ContactStageQueryWhereInput } from '@domains/contact/stage/inputs/contact-stage-query-where.input';
import { ContactStatusQueryWhereInput } from '@domains/contact/stage/inputs/contact-status-query-where.input';

@InputType()
export class ContactHistoryQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactHistoryQueryWhereInput], { nullable: true })
    _and?: [ContactHistoryQueryWhereInput];

    @Field(_type => [ContactHistoryQueryWhereInput], { nullable: true })
    _or?: [ContactHistoryQueryWhereInput];

    @Field({ nullable: true })
    contact_id?: NumberComparisionOperatorsInput;

    // TODO: hay mas para agregar?
}
