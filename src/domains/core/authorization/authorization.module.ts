import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { PermissionModule } from '@domains/user/role/permission/permission.module';

@Module({
    imports: [PermissionModule],
    providers: [AuthorizationService],
    exports: [AuthorizationService],
})
export class AuthorizationModule {}
