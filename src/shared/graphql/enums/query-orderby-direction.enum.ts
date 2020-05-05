import { registerEnumType } from '@nestjs/graphql';

export enum QueryOrderByDirection {
    ASC = 'ASC',
    DESC = 'DESC',
}

registerEnumType(QueryOrderByDirection, {
    name: 'QueryOrderByDirection',
});
