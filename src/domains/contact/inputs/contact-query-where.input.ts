import { CompanyQueryWhereInput } from '@domains/company/inputs/company-query-where.input';
import { ContactStageQueryWhereInput } from '@domains/contact/stage/inputs/contact-stage-query-where.input';
import { ContactStatusQueryWhereInput } from '@domains/contact/stage/inputs/contact-status-query-where.input';
import { NumberComparisionOperatorsInput, StringComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';
import { Field, InputType } from '@nestjs/graphql';
import { BaseQueryWhereInput } from '@shared/base-classes/base-query-where-input';
import { IsNumericId } from '@shared/validators/isId.validator';
import { IsInt, IsOptional, IsPositive, IsString, MaxLength, MinLength } from "class-validator";

@InputType()
export class ContactQueryWhereInput extends BaseQueryWhereInput {
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _and?: [ContactQueryWhereInput];

    @IsOptional()
    @Field(_type => [ContactQueryWhereInput], { nullable: true })
    _or?: [ContactQueryWhereInput];

    @IsNumericId()
    @Field({ nullable: true })
    id?: NumberComparisionOperatorsInput;

    @IsString()
    @MinLength(3, { message: "Title is too short" })
    @MaxLength(50, { message: "Title is too long" })
    @IsOptional()
    @Field({ nullable: true })
    name?: StringComparisionOperatorsInput;

    @IsNumericId()
    @Field({ nullable: true })
    company_id?: NumberComparisionOperatorsInput;

    @Field({ nullable: true })
    company?: CompanyQueryWhereInput;

    @Field({ nullable: true })
    stage?: ContactStageQueryWhereInput;

    @Field({ nullable: true })
    status?: ContactStatusQueryWhereInput;
}
