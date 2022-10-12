import { connectDb } from '../database/db';
import { gCall } from './gCall';
import { faker } from '@faker-js/faker';
import { UserModel, UserResponse } from '../users/user.model';

beforeAll(async () => {
  await connectDb('test');
});

afterAll(async () => {
  const mongo = connectDb('test');
  await (await mongo).connection.db.dropDatabase();
});

const registerMutation = `
mutation Mutation($registerUser: RegisterUserInput!) {
  registerUser(registerUser: $registerUser) {
    user {
      _id
      email
    }
    token
  }
}
`;

describe('Register', () => {
  it('create user', async () => {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gCall({
      source: registerMutation,
      variableValues: {
        registerUser: user,
      },
    });

    const userResponse = {
      user: response.data.registerUser.user,
      token: response.data.registerUser.token,
    } as UserResponse;

    expect(response).toMatchObject({
      data: { registerUser: userResponse },
    });

    const dbUser = await UserModel.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toBe(user.email);
  });
});
