import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
@InputType('RecipeInput')
export default class Recipe {
    @Field()
    title!: string;

    @Field({ nullable: true })
    description?: string;

    @Field(type => [Recipe], { nullable: 'itemsAndList' })
    children?: Recipe[];

    @Field(type => Recipe, { nullable: true })
    parent?: Recipe;
}
