import _ from 'lodash';
import { EntitySchema, getConnection } from 'typeorm';
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage';

export abstract class GraphqlTypeOrmMapper {

    protected static getGraphqlObjectTypeMetadata(objectName: Function | EntitySchema<unknown> | string) {
        const metadataStorage = TypeMetadataStorage;

        if (typeof objectName === 'function') {
            objectName = objectName.name;
        }

        return _.find(metadataStorage.getObjectTypesMetadata(), (it) => it.name === objectName);
    }

    protected static getGraphqlFieldMetadata(
        objectName: Function | EntitySchema<unknown> | string,
        fieldName: string,
    ) {
        const objectTypeMetadata = this.getGraphqlObjectTypeMetadata(objectName);
        return _.find(objectTypeMetadata?.properties, (it) => it.schemaName === fieldName);
    }


    public static mapTypeOrmRelationMetadata(target: Function | EntitySchema<unknown> | string, fieldName: string) {
        const entityMetadata = getConnection().getMetadata(target);
        const fieldMetadata = this.getGraphqlFieldMetadata(target, fieldName);

        //Field was not found in TypeGraphQL
        if (!fieldMetadata) {
            return undefined;
        }

        //Try to find relation by field name
        return entityMetadata.findRelationWithPropertyPath(fieldMetadata.name);
    }

    public static mapTypeOrmColumnMetadata(target: Function | EntitySchema<unknown> | string, fieldName: string) {
        const entityMetadata = getConnection().getMetadata(target);
        const fieldMetadata = this.getGraphqlFieldMetadata(target, fieldName);

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
