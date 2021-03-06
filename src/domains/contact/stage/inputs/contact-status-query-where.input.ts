import { Field, InputType } from "@nestjs/graphql";
import { BaseQueryWhereInput } from "@shared/base-classes/base-query-where-input";
import { NumberComparisionOperatorsInput } from "graphql/inputs/query-where-comparision-operators.input";
import { ContactQueryWhereInput } from "../../inputs/contact-query-where.input";
import { IsInt, IsPositive, IsOptional } from "class-validator";

@InputType()
export class ContactStatusQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @IsInt()
    @IsPositive()
    @IsOptional()
    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;
}