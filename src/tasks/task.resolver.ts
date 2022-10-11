import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { Context } from '../context';
import { UserModel } from '../users/user.model';
import { TaskInput, updateTaskStatusInput } from './task.input';
import { Task, TaskModel, TaskResponse } from './task.model';
import pino from 'pino';

const logger = pino();

@Resolver(() => Task)
export class TaskResolver {
  @Authorized()
  @Query(() => [Task])
  async tasks(@Ctx() ctx: Context): Promise<Task[]> {
    logger.info('Listing all tasks for logged user');
    const tasks = await TaskModel.find({ 'author._id': ctx.user._id });
    return tasks;
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async updateTask(
    @Arg('updateTask') updateTaskInput: updateTaskStatusInput,
    @Ctx() ctx: Context,
  ): Promise<TaskResponse> {
    logger.info('Updating Task Status');
    const user = await UserModel.findById(ctx.payload.id);
    const task = await TaskModel.findById(updateTaskInput.id);
    if (!task) {
      logger.info('Task not found');
      return { task: null, success: false, message: 'Task not found' };
    }

    if (!task.author._id.equals(user._id)) {
      logger.info('Task does not belong to authenticated user');
      return { task: null, success: false, message: 'Task does not belong to authenticated user' };
    }

    await task.save();
    logger.info('Task updated');
    return { task: task, success: true, message: 'Task updated' };
  }

  @Authorized()
  @Mutation(() => TaskResponse)
  async addTask(@Arg('addTask') taskInput: TaskInput, @Ctx() ctx: Context): Promise<TaskResponse> {
    logger.info('Creating Task');
    const user = await UserModel.findById(ctx.payload.id);
    const task = new TaskModel({
      title: taskInput.title,
      description: taskInput.description,
      status: taskInput.status,
      author: { _id: user._id, email: user.email },
    } as Task);
    await task.save();
    logger.info('Task Created');
    return { task: task, success: true, message: 'Task created' };
  }
}
