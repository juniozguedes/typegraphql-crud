import 'reflect-metadata';
import { ApolloServer } from 'apollo-server';
import * as dotenv from 'dotenv';
import pino from 'pino';
import { connectDb } from './database/db';
import { createSchema } from './test-utils/createSchema';

async function bootstrap() {
  const logger = pino();
  dotenv.config();
  try {
    logger.info('Starting bootstrap function');

    //Connect to Mongo Database
    connectDb('dev');

    const schema = await createSchema();

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
