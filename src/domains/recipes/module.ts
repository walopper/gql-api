import { Module } from "@nestjs/common";

import RecipeResolver from "./resolver";
import RecipeService from "./service";
import { RecipeRepository } from './repository';

@Module({
  providers: [RecipeResolver, RecipeService, RecipeRepository],
})
export default class RecipeModule {};
