import { QueryOrderByDirection } from '../enums/query-orderby-direction.enum';

export interface IQueryOrderByInput {
    [key: string]: QueryOrderByDirection | IQueryOrderByInput | undefined;
}
