import { registerEnumType } from '@nestjs/graphql';
import { QueryOrderByDirection } from '../../shared/enums/query-orderby-direction.enum';

registerEnumType(QueryOrderByDirection, {
    name: 'QueryOrderByDirection',
});
