import { Field, InputType, Int } from "type-graphql";
import { User } from "./user.model";

@InputType({ description: "Register user" })
export class RegisterInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}