import { Inject, Injectable } from '@nestjs/common';
import { Resolver, Query, Mutation, Context, Args, ResolveField } from '@nestjs/graphql';
import RecipeService from "./service";
import Recipe from "./type";
import { Loader } from '../../shared/graphql/decorators/dataloader.decorator';

@Injectable()
@Resolver()
export default class RecipeResolver {

  @Inject()
  private recipeService: RecipeService;

  constructor() {
    console.log(`${this.constructor.name} was created`);
  }

  @Query(returns => [Recipe])
  async recipes(@Context() context : any) {
    return this.recipeService.getRecipes();
  }
/*
  @ResolveField(returns => [Recipe])
  async children(@Loader() loader : any) {
    console.log(loader);
    return this.recipeService.getRecipes();
  }
*/
  @Mutation(returns => Recipe)
  addRecipe(@Args("input") recipe: Recipe) {
    //this.recipeService.addRecipe(recipe);
    return recipe;
  }
}
