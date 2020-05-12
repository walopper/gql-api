import { CompanyRepository } from './company.repository';
import { Company } from './company.entity';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '../../shared/base-classes/base-entity-service';

@Injectable({ scope: Scope.REQUEST })
export class CompanyService extends BaseEntityService<Company> {
    @InjectRepository(CompanyRepository)
    protected readonly repository: CompanyRepository;
}
