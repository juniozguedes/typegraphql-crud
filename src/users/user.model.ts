import { prop as Property, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}


export const UserModel = getModelForClass(User);