import { Field, InputType, Int } from "type-graphql";
import { Recipe } from "./recipe.model";

@InputType({ description: "New recipe data" })
export class RecipeInput{
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}