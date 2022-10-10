import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import { ObjectIdScalar } from '../object-id.scalar';
import { UserModel } from '../users/user.model';
import { RecipeInput } from './recipe.input';
import { Recipe, RecipeModel } from './recipe.model';

@Resolver(() => Recipe)
export class RecipeResolver {
  @Authorized()
  @Query(() => Recipe, { nullable: true })
  recipe(@Arg('recipeId', () => ObjectIdScalar) recipeId: ObjectId) {
    return RecipeModel.findById(recipeId);
  }

  @Authorized()
  @Query(() => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return await RecipeModel.find({});
  }

  @Authorized()
  @Mutation(() => Recipe)
  async addRecipe(@Arg('addRecipe') recipeInput: RecipeInput, @Ctx() ctx: Context): Promise<Recipe> {
    const user = await UserModel.findById(ctx.payload.id);
    const recipe = new RecipeModel({
      ...recipeInput,
      author: user,
    } as unknown as Recipe);

    await recipe.save();
    return recipe;
  }
}
