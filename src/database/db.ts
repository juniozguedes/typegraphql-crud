import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import pino from 'pino';

const logger = pino();

dotenv.config();

export async function connectDb(environment: string) {
  logger.info(`Connecting to Mongo Database in ${environment} environment`);
  const MONGO_BASE_URL = process.env.MONGO_URL || 'mongodb://0.0.0.0:27020/';
  const urlString = `${MONGO_BASE_URL}/${environment}?retryWrites=true&w=majority`;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mongoose = await connect(urlString);
  logger.info('Database connected');
  return mongoose;
  //logger.info('Cleaning and seeding database');
  // clean and seed database with some data
  //await mongoose.connection.db.dropDatabase();
  //const { defaultUser } = await seedDatabase();
}
