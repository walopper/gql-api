import { Inject, Injectable, Req, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import Recipe from './type';
import { RecipeRepository } from './repository';

@Injectable({ scope: Scope.REQUEST })
export default class RecipeService {
    private readonly recipes: Recipe[] = [];

    @Inject()
    private recipeRepository: RecipeRepository;

    constructor(@Inject(CONTEXT) context) {
        console.log(`${this.constructor.name} was created`);
    }

    getRecipes(): Recipe[] {
        this.recipeRepository.test();

        const recipe1 = new Recipe();
        recipe1.title = 'Titulo 1';
        recipe1.description = 'Descripción 1';

        const recipe2 = new Recipe();
        recipe2.title = 'Titulo 2';
        recipe2.description = 'Descripción 2';

        return [recipe1, recipe2];
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
    }
}
