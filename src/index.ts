import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { TaskResolver } from './tasks/task.resolver';
import { ApolloServer } from 'apollo-server';
import { TypegooseMiddleware } from './middlewares/typegoose-middleware';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './database/object-id.scalar';
import { UserResolver } from './users/user.resolver';
import { customAuthChecker } from './middlewares/auth';
import * as dotenv from 'dotenv';
import pino from 'pino';
import { connectDb } from './database/db';

async function bootstrap() {
  const logger = pino();
  dotenv.config();
  try {
    logger.info('Starting bootstrap function');

    //Connect to Mongo Database
    connectDb();

    const schema = await buildSchema({
      resolvers: [TaskResolver, UserResolver],
      globalMiddlewares: [TypegooseMiddleware],
      scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
      validate: false,
      authChecker: customAuthChecker,
    });

    // create mocked context
    //const context: Context = { user: defaultUser };

    // Create GraphQL server
    const server = new ApolloServer({ schema, context: ({ req, res }) => ({ req, res }) });

    logger.info('Starting Server');
    // Start the Apollo server
    const port = process.env.PORT || 4000;
    const { url } = await server.listen(port);
    logger.info(`Server is running, GraphQL Playground available at ${url}`);
  } catch (e) {
    console.log(e);
  }
}

bootstrap();
