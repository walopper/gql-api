import { EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { BaseEntityRepository } from '@shared/base-classes/base-entity-repository';

@EntityRepository(User)
export class UserRepository extends BaseEntityRepository<User> {}
