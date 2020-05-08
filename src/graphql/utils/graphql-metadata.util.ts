import _ from 'lodash';
import { EntitySchema } from 'typeorm';
import { TypeMetadataStorage } from '@nestjs/graphql/dist/schema-builder/storages/type-metadata.storage';

export abstract class GraphqlMetadata {
    public static getObjectTypeMetadata(objectName: Function | EntitySchema<unknown> | string) {
        const metadataStorage = TypeMetadataStorage;
        const ignoredClasses = ['ConnectionClass'];

        if (typeof objectName === 'function') {
            objectName = objectName.name;
        }

        return _.find(metadataStorage.getObjectTypesMetadata(), it => {
            if (ignoredClasses.indexOf(it.target.name) !== -1) {
                return false;
            }

            return it.name === objectName;
        });
    }

    public static getFieldMetadata(objectName: Function | EntitySchema<unknown> | string, fieldName: string) {
        const objectTypeMetadata = this.getObjectTypeMetadata(objectName);
        return _.find(objectTypeMetadata?.properties, it => it.schemaName === fieldName);
    }
}
