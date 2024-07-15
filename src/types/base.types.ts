import { Request } from 'express';
import { IAuthTokens } from './auth.types';

export interface IBase {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

type TCookies = {} & Omit<IAuthTokens, 'accessToken'>;

export interface IRequest<IParams = {}, TBody = {}>
  extends Request<IParams, any, TBody, any> {
  cookies: TCookies;
}
