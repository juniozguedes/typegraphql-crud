import { connectDb } from '../database/db';
import { gCall } from './gCall';
import { faker } from '@faker-js/faker';
import { Task, TaskResponse } from '../tasks/task.model';
import { seedDatabase } from '../database/helpers';
import { UserResponse } from '../users/user.model';
import { TaskInput } from '../tasks/task.input';
import { Status } from '../tasks/status.enum';

beforeAll(async () => {
  await connectDb('test');
  const { defaultUser } = await seedDatabase();
  //console.log(defaultUser);
});

afterAll(async () => {
  const mongo = connectDb('test');
  await (await mongo).connection.db.dropDatabase();
});

const loginMutation = `
mutation Mutation($loginUser: RegisterUserInput!) {
    loginUser(loginUser: $loginUser) {
      user {
        email
        _id
      }
      token
    }
  }
`;

const addTaskMutation = `
mutation AddTask($addTask: TaskInput!) {
    addTask(addTask: $addTask) {
      task {
        _id
        title
        description
        status
        author {
          _id
          email
        }
      }
      success
      message
    }
  }
`;

describe('Create Task', () => {
  it('it should create task', async () => {
    const email = 'test';
    const password = 'test';
    const user = { email, password };

    const userLoginResponse = await gCall({
      source: loginMutation,
      variableValues: {
        loginUser: { email: 'test', password: 'test' },
      },
    });
    console.log('user login respo', userLoginResponse);
    const task = {
      title: faker.internet.email(),
      description: faker.name.fullName(),
      status: 'TO_DO',
    } as any;
    console.log(userLoginResponse.data.loginUser.token);

    const response = await gCall({
      source: addTaskMutation,
      variableValues: {
        addTask: task,
        headers: { Authorization: `Bearer ${userLoginResponse.data.loginUser.token}` },
      },
    });
    const taskResponse = {
      message: 'Task created',
      success: true,
      task,
    } as TaskResponse;

    expect(response).toMatchObject({
      data: { addTask: taskResponse },
    });
  });
});
