import { Module } from '@nestjs/common';
import { ContactsModule } from './domains/contacts/contacts.module';
import RecipeModule from './domains/recipes/module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLCommonModule } from './shared/graphql/graphql-common.module';

@Module({
  imports: [
    GraphQLCommonModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    ContactsModule,
    RecipeModule,
  ],
})
export class AppModule {}
