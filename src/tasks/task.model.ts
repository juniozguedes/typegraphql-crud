import { prop as Property, getModelForClass } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb'; //Showed in documentation example but not working on Recipe._id

import { Ref } from '../types';
import { Field, ObjectType } from 'type-graphql';
import { User } from '../users/user.model';
import { Status } from './status.enum';

@ObjectType()
export class Task {
  @Field()
  _id: ObjectId;

  @Field()
  @Property({ required: true })
  title: string;

  @Field({ nullable: true })
  @Property()
  description?: string;

  @Field((type) => Status)
  @Property({ required: true })
  status: Status;

  @Field(() => User)
  @Property({ required: true })
  author: Omit<User, 'password'>;
}

@ObjectType()
export class TaskResponse {
  @Field(() => Task, { nullable: true })
  task?: Task;

  @Field(() => String, { nullable: true })
  success?: boolean;

  @Field(() => String, { nullable: true })
  message?: string;
}

export const TaskModel = getModelForClass(Task);
