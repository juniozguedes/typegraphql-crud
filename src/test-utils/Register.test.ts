import { connectDb } from '../database/db';
import { gCall } from './gCall';

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
    console.log(
      await gCall({
        source: registerMutation,
        variableValues: {
          data: {
            email: 'bob',
            password: 'password',
          },
        },
      }),
    );
    return true;
  });
});
