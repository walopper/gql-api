import { Source } from '@domains/source/source.entity';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';
import { EntityRepository } from 'typeorm';

@EntityRepository(Source)
export class SourceRepository extends BaseEntityRepository<Source> { }
