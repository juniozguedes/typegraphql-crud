import { connect } from 'mongoose';
import * as dotenv from 'dotenv';
import pino from 'pino';

const logger = pino();

dotenv.config();

export async function connectDb() {
  logger.info('Connecting to Mongo Database');
  const MONGO_DB_URL = process.env.MONGO_URL;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const mongoose = await connect(MONGO_DB_URL);
  logger.info('Database connected');

  //logger.info('Cleaning and seeding database');
  // clean and seed database with some data
  //await mongoose.connection.db.dropDatabase();
  //const { defaultUser } = await seedDatabase();
}
