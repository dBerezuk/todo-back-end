import { TUserResultData } from './user.types';

declare global {
  namespace Express {
    interface User extends TUserResultData {}
    interface Request {
      user?: User;
    }
  }
}

export {};
