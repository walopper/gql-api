import { InputType, Field } from "@nestjs/graphql"; import { BaseQueryWhereInput } from "@shared/base-classes/base-query-where-input"; import { ContactQueryWhereInput } from "../../inputs/contact-query-where.input"; import { NumberComparisionOperatorsInput } from "graphql/inputs/query-where-comparision-operators.input";

@InputType()
export class ContactStageQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;
}