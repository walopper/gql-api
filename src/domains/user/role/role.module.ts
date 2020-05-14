import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '@domains/user/role/role.entity';
import { PermissionRule } from '@domains/user/role/permission/permission-rule.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Role, PermissionRule])],
})
export class RoleModule {}
