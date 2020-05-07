import { QueryOrderByDirection } from '../../shared/enums/query-orderby-direction.enum';

export interface IQueryOrderByInput {
    [key: string]: QueryOrderByDirection | IQueryOrderByInput | undefined;
}
