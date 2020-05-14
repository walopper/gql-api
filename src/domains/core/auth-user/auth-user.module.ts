import { Global, Module } from '@nestjs/common';
import { UserModule } from '@domains/user/user.module';
import { AuthUserService } from '@domains/core/auth-user/auth-user.service';
import { AuthModule } from '@domains/core/auth/auth.module';

@Global()
@Module({
    imports: [UserModule, AuthModule],
    providers: [AuthUserService],
    exports: [AuthUserService],
})
export class AuthUserModule { }
