import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { User } from './users/user.model';

export interface Context {
  req: Request;
  res: Response;
  payload: AccessTokenPayload;
  user: User;
}

export interface AccessTokenPayload {
  id: ObjectId;
}
