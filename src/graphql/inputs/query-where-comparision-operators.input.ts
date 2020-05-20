import { InputType, Field } from '@nestjs/graphql';

export type ComparisionOperatorsValue = Scalar | Scalar[];

export class ComparisionOperatorsInput {
    [key: string]: ComparisionOperatorsValue | undefined;
}

@InputType()
export class StringComparisionOperatorsInput extends ComparisionOperatorsInput {
    @Field({ nullable: true })
    _eq?: string;

    @Field({ nullable: true })
    _not_eq?: string;

    @Field(_type => [String], { nullable: true })
    _in?: string[];

    @Field(_type => [String], { nullable: true })
    _not_in?: string[];

    @Field({ nullable: true })
    _contains?: string;

    @Field({ nullable: true })
    _not_contains?: string;

    @Field({ nullable: true })
    _starts_with?: string;

    @Field({ nullable: true })
    _not_starts_with?: string;

    @Field({ nullable: true })
    _ends_With?: string;

    @Field({ nullable: true })
    _not_ends_With?: string;

    @Field({ nullable: true })
    _is_null?: boolean;
}

@InputType()
export class NumberComparisionOperatorsInput extends ComparisionOperatorsInput {
    @Field({ nullable: true })
    _eq?: number;

    @Field({ nullable: true })
    _not_eq?: number;

    @Field(_type => [Number], { nullable: true })
    _in?: number[];

    @Field(_type => [Number], { nullable: true })
    _not_in?: number[];

    @Field({ nullable: true })
    _is_null?: boolean;

    // Faltan >= > <= <
}

@InputType()
export class BooleanComparisionOperatorsInput extends ComparisionOperatorsInput {
    @Field({ nullable: true })
    _eq?: boolean;

    @Field({ nullable: true })
    _not_eq?: boolean;

    @Field({ nullable: true })
    _is_null?: boolean;
}
