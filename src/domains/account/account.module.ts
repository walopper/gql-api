import { AccountRepository } from '@domains/account/account.repository';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Institution } from '../institution/institution.entity';
import { Account } from '@domains/account/account.entity';
import { AccountService } from '@domains/account/account.service';
import { AccountResolver } from '@domains/account/account.resolver';


@Module({
    imports: [
        TypeOrmModule.forFeature([
            Institution,
            Account,
            AccountRepository
        ])],
    providers: [
        AccountResolver,
        AccountService
    ],
    exports: [
        TypeOrmModule,
        AccountService
    ],
})
export class AccountModule { }
