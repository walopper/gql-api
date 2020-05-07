import { EntityRepository, QueryRunner } from 'typeorm';
import { Company } from './company.entity';
import { BaseRepository } from '../../shared/base-classes/base-repository';
import { SelectQueryBuilder } from '../../shared/utils/select-query-builder';

@EntityRepository(Company)
export class CompanyRepository extends BaseRepository<Company> {
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        const query: SelectQueryBuilder<Company> = super.createQueryBuilder(alias, queryRunner);
        query.leftJoinAndSelect(`${query.alias}.Institution`, 'institution');
        return query;
    }
}
