import { EntityRepository } from 'typeorm';
import { Company } from './company.entity';
import { InstitutionBaseRepository } from '../institution/institution-base.repository';

@EntityRepository(Company)
export class CompanyRepository extends InstitutionBaseRepository<Company> {}
