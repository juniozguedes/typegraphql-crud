import { ObjectId } from 'mongodb';
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import { ObjectIdScalar } from '../object-id.scalar';
import { UserModel } from '../users/user.model';
import { Status } from './status.enum';
import { TaskInput } from './task.input';
import { Task, TaskModel, TaskResponse } from './task.model';

@Resolver(() => Task)
export class TaskResolver {
  @Authorized()
  @Query(() => Task, { nullable: true })
  task(@Arg('taskId', () => ObjectIdScalar) taskId: ObjectId) {
    return TaskModel.findById(taskId);
  }

  @Authorized()
  @Query(() => [Task])
  async tasks(@Ctx() ctx: Context): Promise<Task[]> {
    return await TaskModel.find({ author: ctx.user });
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async addTask(@Arg('addTask') taskInput: TaskInput, @Ctx() ctx: Context): Promise<TaskResponse> {
    const user = await UserModel.findById(ctx.payload.id);
    const task = new TaskModel({
      title: taskInput.title,
      description: taskInput.description,
      status: taskInput.status,
      author: { _id: user._id, email: user.email },
    } as Task);
    await task.save();
    return { task: task, success: true, message: 'Task created' };
  }
}
