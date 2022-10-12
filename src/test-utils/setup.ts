import { connectDb } from '../database/db';

connectDb('test').then(() => process.exit());
