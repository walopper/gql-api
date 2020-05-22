import { Source } from '@domains/source/source.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';
import { SourceRepository } from '@domains/source/source.repository';

@Injectable()
export class SourceService extends BaseEntityService<Source> {
    @InjectRepository(SourceRepository)
    protected readonly repository: SourceRepository;
}

