import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType("RecipeInput")
export default class Recipe {
  @Field()
  title!: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [Recipe])
  children?: Recipe[];
}
