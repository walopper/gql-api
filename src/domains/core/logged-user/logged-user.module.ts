import { Global, Module } from '@nestjs/common';
import { UserModule } from '@domains/user/user.module';
import { LoggedUserService } from '@domains/core/logged-user/logged-user.service';
import { AuthModule } from '@domains/core/auth/auth.module';

@Global()
@Module({
    imports: [UserModule, AuthModule],
    providers: [LoggedUserService],
    exports: [LoggedUserService],
})
export class AuthUserModule { }
