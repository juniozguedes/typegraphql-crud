import { Field, InputType } from 'type-graphql';

@InputType({ description: 'New recipe data' })
export class RecipeInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}
