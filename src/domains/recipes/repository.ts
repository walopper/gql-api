import { Injectable, Scope } from '@nestjs/common';

@Injectable()
export class RecipeRepository {

    constructor() {
        console.log(`${this.constructor.name} was created`);
    }

    test() {
        console.log('recipeRepository test');
    }
}
