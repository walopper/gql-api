import _ from 'lodash';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from '@domains/user/role/permission/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
    @InjectRepository(Permission)
    protected readonly permissionRepository: Repository<Permission>;

    public async getAll(): Promise<Permission[]> {
        return this.permissionRepository.find();
    }

    public async getOne(id: number): Promise<Permission | undefined> {
        const permissions = await this.getAll();

        return _.find(permissions, { id });
    }
}
