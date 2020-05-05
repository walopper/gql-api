import { QueryOrderByDirection } from '../enums/query-orderby-direction.enum';

export type QueryOrderByInputValue = QueryOrderByDirection | BaseQueryOrderByInput;

export class BaseQueryOrderByInput {
    [key: string]: QueryOrderByInputValue | undefined;
}
