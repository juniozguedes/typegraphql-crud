import { ObjectId } from 'mongodb';
import { buildSchema } from 'type-graphql';
import { ObjectIdScalar } from '../database/object-id.scalar';
import { customAuthChecker } from '../middlewares/auth';
import { TypegooseMiddleware } from '../middlewares/typegoose-middleware';
import { TaskResolver } from '../tasks/task.resolver';
import { UserResolver } from '../users/user.resolver';

export const createSchema = () =>
  buildSchema({
    resolvers: [TaskResolver, UserResolver],
    globalMiddlewares: [TypegooseMiddleware],
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: false,
    authChecker: customAuthChecker,
  });
