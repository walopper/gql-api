import { Inject, Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Context, Args, ResolveField, Parent } from '@nestjs/graphql';
import RecipeService from './service';
import Recipe from './type';
import { DataloaderFn, Loader } from '../../shared/graphql/libs/dataloader';

@Injectable()
@Resolver(of => Recipe)
export default class RecipeResolver {
    @Inject()
    private recipeService: RecipeService;

    constructor() {
        console.log(`${this.constructor.name} was created`);
    }

    @Query(returns => [Recipe])
    async recipes(@Context() context: any) {
        return this.recipeService.getRecipes();
    }

    @ResolveField('children', () => [Recipe])
    async getChildren(@Parent() recipe: Recipe, @Loader({ typeORM: false }) loader: DataloaderFn<Recipe[], Recipe[]>) {
        //Dataloader Batch
        return loader(async (parentRecipesIds: Recipe[]) => {
            console.log('Children', parentRecipesIds);
            return [this.recipeService.getRecipes(), this.recipeService.getRecipes()];
        });
    }

    @ResolveField('parent', () => Recipe)
    async getParent(@Parent() recipe: Recipe, @Loader({ typeORM: true }) loader: DataloaderFn<Recipe[], Recipe>) {
        //Dataloader Batch
        return loader(async (childRecipesIds: Recipe[]) => {
            console.log('Parent', childRecipesIds);
            return this.recipeService.getRecipes();
        });
    }

    @Mutation(returns => Recipe)
    addRecipe(@Args('input') recipe: Recipe) {
        //this.recipeService.addRecipe(recipe);
        return recipe;
    }
}
