import { ComparisionOperatorsInput } from '@graphql/inputs/query-where-comparision-operators.input';

export type QueryWhereInputValue = ComparisionOperatorsInput | BaseQueryWhereInput | BaseQueryWhereInput[];

export abstract class BaseQueryWhereInput {
    [key: string]: QueryWhereInputValue | undefined;
}
