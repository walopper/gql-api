import { InputType, Field } from "@nestjs/graphql"; import { BaseQueryWhereInput } from "@shared/base-classes/base-query-where-input"; import { ContactQueryWhereInput } from "./contact-query-where.input"; import { NumberComparisionOperatorsInput } from "graphql/inputs/query-where-comparision-operators.input";

@InputType()
export class ContactStatusQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;
}