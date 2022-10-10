import { AuthChecker } from 'type-graphql';
import { AccessTokenPayload, Context } from './context';
import { UserModel } from './users/user.model';
import pino from 'pino';

import * as jwt from 'jsonwebtoken';
const logger = pino();

export const customAuthChecker: AuthChecker<Context> = async ({ context }) => {
  logger.info('Checking authorization');
  const authorization = context.req.headers.authorization;
  if (!authorization) return false;

  try {
    const token = authorization.split(' ')[1];
    const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'aslkdfjoiq12312') as AccessTokenPayload;
    context.payload = payload;
  } catch (err) {
    logger.info(err.message);
    return false;
  }

  const user = await UserModel.findById(context.payload.id);
  if (!user) return false;
  context.user = user;
  logger.info('User authorized');
  return true;
};
