import { buildSchema } from 'type-graphql';
import 'reflect-metadata';
import { TaskResolver } from './tasks/task.resolver';
import { ApolloServer } from 'apollo-server';
import { connect } from 'mongoose';
import { TypegooseMiddleware } from './typegoose-middleware';
import { ObjectId } from 'mongodb';
import { ObjectIdScalar } from './object-id.scalar';
import { UserResolver } from './users/user.resolver';
import { customAuthChecker } from './auth';
import * as dotenv from 'dotenv';
import pino from 'pino';

async function bootstrap() {
  const logger = pino();
  dotenv.config();
  const MONGO_DB_URL = process.env.MONGO_URL;
  try {
    logger.info('Starting bootstrap function');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mongoose = await connect(MONGO_DB_URL);

    //logger.info('Cleaning and seeding database');
    // clean and seed database with some data
    //await mongoose.connection.db.dropDatabase();
    //const { defaultUser } = await seedDatabase();

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
