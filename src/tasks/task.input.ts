import { ObjectId } from 'mongodb';
import { Field, InputType, registerEnumType } from 'type-graphql';
import { Status } from './status.enum';

@InputType({ description: 'New task data' })
export class TaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field((type) => Status)
  status: Status;
}

@InputType({ description: 'New task data' })
export class updateTaskStatusInput {
  @Field()
  id: ObjectId;

  @Field((type) => Status)
  status: Status;
}
