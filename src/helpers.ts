import { Recipe, RecipeModel } from "./recipes/recipe.model";
import { User, UserModel } from "./users/user.model"

export async function seedDatabase() {
  const defaultUser = new UserModel({
    email: "test@github.com",
    password: "s3cr3tp4ssw0rd",
  } as User);
  await defaultUser.save();

  await RecipeModel.create([
          {
              title: "Recipe 1",
              description: "Desc 1",
              author: defaultUser._id,
          },
          {
              title: "Recipe 2",
              author: defaultUser._id
          },
      ] as unknown as Recipe[]);

  return { defaultUser };
}