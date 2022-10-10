import { ObjectId } from 'mongodb';
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { ObjectIdScalar } from '../object-id.scalar';
import { RegisterUserInput } from './user.input';
import { User, UserModel, UserResponse } from './user.model';
import * as jwt from 'jsonwebtoken';

import * as bcrypt from 'bcrypt';
import pino from 'pino';

const logger = pino();
@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  user(
    @Arg('userId', () => ObjectIdScalar)
    userId: ObjectId,
  ) {
    return UserModel.findById(userId);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return await UserModel.find({});
  }

  @Mutation(() => UserResponse)
  async registerUser(@Arg('registerUser') userInput: RegisterUserInput): Promise<UserResponse> {
    logger.info('Checking if user exists in database');
    const userExists = await UserModel.findOne({ email: userInput.email });
    if (userExists) {
      logger.info('User exists in database:', userExists);

      //jwt
      const payload = {
        id: userExists._id,
      };

      const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'aslkdfjoiq12312');
      return { user: userExists, token };
    }

    logger.info('User does not exist in database, creating a new User');
    const hash = await bcrypt.hash(userInput.password, 10);
    const newUser = new UserModel({
      email: userInput.email,
      password: hash,
    } as User);

    await newUser.save();
    // 3. store user id on the token payload
    const payload = {
      id: newUser._id,
    };

    const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312');

    const user = await UserModel.findOne({ email: userInput.email });
    return { user: user, token: token };
  }

  @Mutation(() => UserResponse)
  async loginUser(@Arg('loginUser') userInput: RegisterUserInput): Promise<UserResponse> {
    logger.info('Checking if user exists in database');
    const userExists = await UserModel.findOne({ email: userInput.email });
    if (!userExists) {
      return { user: null, token: 'User does not exists' };
    }

    logger.info('User exists in database:');

    // Load hash from your password DB.
    const result = await bcrypt.compare(userInput.password, userExists.password);

    if (result) {
      const payload = {
        id: userExists._id,
      };

      const token = jwt.sign(payload, process.env.SESSION_SECRET || 'aslkdfjoiq12312');

      logger.info('Success, user logged in');
      return { user: userExists, token };
    }

    logger.info('Invalid password');
    return { user: null, token: 'Invalid pass' };
  }
}
