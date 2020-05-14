import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { PermissionRule } from './permission-rule.entity';
import { Role } from '@domains/user/role/role.entity';
import { PermissionService } from '@domains/user/role/permission/permission.service';

@Module({
    imports: [TypeOrmModule.forFeature([Role, Permission, PermissionRule])],
    providers: [PermissionService],
    exports: [PermissionService],
})
export class PermissionModule {}
