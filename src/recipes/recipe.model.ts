import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb'; //Showed in documentation example but not working on Recipe._id

//import { Rate } from "./rate";
import { Ref } from '../types';
import { Field, ObjectType } from 'type-graphql';
import { User } from '../users/user.model';

@ObjectType()
export class Recipe {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: string;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field(() => User)
  @Property({ ref: User, required: true })
  author: Ref<User>;
}

export const RecipeModel = getModelForClass(Recipe);
