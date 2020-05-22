import { Medium } from '@domains/medium/medium.entity';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Medium)
export class MediumRepository extends BaseEntityRepository<Medium> { }
