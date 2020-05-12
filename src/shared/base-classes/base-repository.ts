//import { ServerError } from './../../utils/errorHandler';
//import { WHERE_INPUT } from './../../config/errorCodes';
import { QueryRunner, Repository, SelectQueryBuilder } from 'typeorm';
//import logger from '../../utils/logger';
import { SelectQueryBuilder as SelectQueryBuilderWrapper } from '../utils/select-query-builder';

export abstract class BaseRepository<Entity> extends Repository<Entity> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilderWrapper<Entity> {
        alias = alias || this.metadata.targetName;
        queryRunner = queryRunner || this.queryRunner;

        const query = new SelectQueryBuilderWrapper<Entity>(this.manager.connection, queryRunner);
        query.from(this.metadata.targetName, alias);

        //Select primary keys
        for (const primaryColumn of this.metadata.primaryColumns) {
            query.addSelect(`${alias}.${primaryColumn.propertyName}`);
        }

        return query;
    }

    public createOriginalQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<Entity> {
        return super.createQueryBuilder(alias || this.metadata.targetName, queryRunner || this.queryRunner);
    }
}
