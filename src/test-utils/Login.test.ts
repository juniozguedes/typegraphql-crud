import { connectDb } from '../database/db';
import { gCall } from './gCall';
import { faker } from '@faker-js/faker';
import { UserModel, UserResponse } from '../users/user.model';
import { seedDatabase } from '../database/helpers';

beforeAll(async () => {
  await connectDb('test');
  const { defaultUser } = await seedDatabase();
});

afterAll(async () => {
  const mongo = connectDb('test');
  await (await mongo).connection.db.dropDatabase();
});

const loginMutation = `
mutation LoginUser($loginUser: RegisterUserInput!) {
    loginUser(loginUser: $loginUser) {
      user {
        _id
        email
      }
      token
    }
  }
`;

describe('Login', () => {
  const email = 'test';
  const password = 'test';
  it('login user with success', async () => {
    const user = { email, password };

    const response = await gCall({
      source: loginMutation,
      variableValues: {
        loginUser: user,
      },
    });

    const userResponse = {
      user: response.data.loginUser.user,
      token: response.data.loginUser.token,
    } as UserResponse;

    expect(response).toMatchObject({
      data: { loginUser: userResponse },
    });

    const dbUser = await UserModel.findOne({ where: { email: user.email } });
    expect(dbUser).toBeDefined();
    expect(dbUser!.email).toBe(email);
  });
});
