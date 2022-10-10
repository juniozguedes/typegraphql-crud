import { Field, InputType } from 'type-graphql';
import { User } from './user.model';

@InputType({ description: 'Register user' })
export class RegisterUserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
