import { prop as Property, getModelForClass, ReturnModelType } from "@typegoose/typegoose";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
  @Field()
  readonly _id: ObjectId;

  @Field()
  @Property({ required: true })
  email: string;

  @Property({ required: true })
  password: string;

  // the "this" definition is required to have the correct types
  public static async findByEmail(this: ReturnModelType<typeof User>, email: string) {
    return this.find({ email }).exec();
  }

}

export const UserModel = getModelForClass(User);