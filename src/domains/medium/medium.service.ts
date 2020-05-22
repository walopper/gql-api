import { Medium } from '@domains/medium/medium.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseEntityService } from '@shared/base-classes/base-entity-service';
import { MediumRepository } from '@domains/medium/medium.repository';

@Injectable()
export class MediumService extends BaseEntityService<Medium> {
    @InjectRepository(MediumRepository)
    protected readonly repository: MediumRepository;
}

