import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLCommonModule } from './shared/graphql/graphql-common.module';
import { CompanyModule } from './domains/company/company.module';
import { ContactModule } from './domains/contact/contact.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'root',
            database: 'leadgogo',
            synchronize: false,
            logging: true,
            entities: ['dist/domains/**/*.entity.js'],
        }),
        GraphQLCommonModule,
        GraphQLModule.forRoot({
            autoSchemaFile: true,
        }),
        ContactModule,
        CompanyModule,
    ],
})
export class AppModule {}
