import { Request } from 'express';
import { TUserResultData } from './user.types';

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export enum EJwtOptions {
  ISSUER = 'todo',
  AUDIENCE = 'todo.com',
}

export interface jwtOptions {
  issuer: EJwtOptions.ISSUER;
  audience: EJwtOptions.AUDIENCE;
}

export type IAuthRequestCookies = Request & {
  cookies: {
    refreshToken: string;
  };
};

export interface IAuthResponse {
  tokens: IAuthTokens;
  user: Omit<TUserResultData, 'password'>;
}
