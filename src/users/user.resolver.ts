import { ObjectId } from "mongodb";
import { Arg, Args, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "..";
import { ObjectIdScalar } from "../object-id.scalar";
import { RegisterInput } from "./user.input";
import { User, UserModel } from "./user.model"

@Resolver(of => User)
export class UserResolver {
  //constructor(private userService: UserService) {}

  @Query(returns => User, { nullable: true })
  user(@Arg("userId", type => ObjectIdScalar) userId: ObjectId) {
    return UserModel.findById(userId);
  }

  @Query(returns => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Mutation(returns => User)
  async addUser(
    @Arg("registerUser") userInput: RegisterInput,
    @Ctx() { user }: Context,
  ): Promise<User> {
    console.log(userInput.email)
    const userExists = await UserModel.findByEmail(userInput.email)
    console.log(userExists)
    if (userExists.length > 0) {
      console.log('exists')
      return userExists[0];
      
    } 
    
    else {
      console.log('does not exists')
      const new_user = new UserModel({
        ...userInput
      } as User);
      await new_user.save();
      return new_user;
    }
  }

}