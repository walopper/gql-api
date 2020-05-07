import {
    BooleanComparisionOperatorsInput,
    NumberComparisionOperatorsInput,
    StringComparisionOperatorsInput,
} from '../inputs/query-where-comparision-operators.input';

export interface IQueryWhereInput {
    [key: string]: StringComparisionOperatorsInput | NumberComparisionOperatorsInput | BooleanComparisionOperatorsInput;
}
