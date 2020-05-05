import { EntityRepository, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Company } from './company.entity';
import { BaseRepository } from '../../shared/base-classes/base.repository';

@Injectable()
@EntityRepository(Company)
export class CompanyRepository extends BaseRepository<Company> {
    /*
    public createQueryBuilder(alias?: string, queryRunner?: QueryRunner) {
        const query: SelectQueryBuilder<Company> = super.createQueryBuilder(alias, queryRunner);
        query.leftJoinAndSelect(`${query.alias}.Institution`, 'institution');
        return query;
    }

     */
}
