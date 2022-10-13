import { Task, TaskModel } from '../tasks/task.model';
import { User, UserModel } from '../users/user.model';
import * as bcrypt from 'bcrypt';

export async function seedDatabase() {
  const hash = await bcrypt.hash('test', 10);

  const defaultUser = new UserModel({
    email: 'test',
    password: hash,
  } as User);
  await defaultUser.save();

  /*   await TaskModel.create([
    {
      title: 'Task 1',
      description: 'Desc 1',
      author: defaultUser._id,
      status: 'to_do',
    },
    {
      title: 'Task 2',
      author: defaultUser._id,
      status: 'to_do',
    },
  ] as unknown as Task[]); */

  return { defaultUser };
}
