import { ObjectId } from "mongodb";
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import { ObjectIdScalar } from "../object-id.scalar";
import { RecipeInput } from "./recipe.input";
import { Recipe, RecipeModel } from "./recipe.model"

@Resolver(of => Recipe)
export class RecipeResolver {
  //constructor(private recipeService: RecipeService) {}

  @Query(returns => Recipe, { nullable: true })
  recipe(@Arg("recipeId", type => ObjectIdScalar) recipeId: ObjectId) {
    return RecipeModel.findById(recipeId);
  }

  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return await RecipeModel.find({});
  }

  @Mutation(returns => Recipe)
  async addRecipe(
    @Arg("recipe") recipeInput: RecipeInput,
    @Ctx() { user }: Context,
  ): Promise<Recipe> {
    const recipe = new RecipeModel({
        ...recipeInput,
        author: user._id,
    } as unknown as Recipe);

    await recipe.save();
    return recipe;
  }


}