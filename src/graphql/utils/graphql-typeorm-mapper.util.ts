import { EntitySchema, getConnection } from 'typeorm';
import { GraphqlMetadata } from './graphql-metadata.util';

export abstract class GraphqlTypeOrmMapper {
    public static mapTypeOrmRelationMetadata(target: Function | EntitySchema<unknown> | string, fieldName: string) {
        const entityMetadata = getConnection().getMetadata(target);
        const fieldMetadata = GraphqlMetadata.getFieldMetadata(target, fieldName);

        //Field was not found in TypeGraphQL
        if (!fieldMetadata) {
            //Try to find the relation directly in TypeORM
            const relationMetadata = entityMetadata.findRelationWithPropertyPath(fieldName);

            if (relationMetadata) {
                return relationMetadata;
            }

            return undefined;
        }

        //Try to find relation by field name
        return entityMetadata.findRelationWithPropertyPath(fieldMetadata.name);
    }

    public static mapTypeOrmColumnMetadata(target: Function | EntitySchema<unknown> | string, fieldName: string) {
        const entityMetadata = getConnection().getMetadata(target);
        const fieldMetadata = GraphqlMetadata.getFieldMetadata(target, fieldName);

        //Field was not found in TypeGraphQL
        if (!fieldMetadata) {
            //Try to find the column directly in TypeORM
            //This happen when we dont have the entity public in the TypeGraphQL Object but we use it directly in a input
            const columnMetadata = entityMetadata.findColumnWithPropertyPath(fieldName);

            if (columnMetadata) {
                return columnMetadata;
            }

            return undefined;
        }

        return entityMetadata.findColumnWithPropertyPath(fieldMetadata.name);
    }
}
