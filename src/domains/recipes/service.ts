import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import Recipe from "./type";
import { RecipeRepository } from './repository';

@Injectable({ scope: Scope.REQUEST })
export default class RecipeService {
  private readonly recipes: Recipe[] = [];

  @Inject()
  private recipeRepository: RecipeRepository;

  constructor(@Inject(CONTEXT) context) {
    console.log(`${this.constructor.name} was created`);
  }

  getRecipes() {
    this.recipeRepository.test();
    return this.recipes;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }
}