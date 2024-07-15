import { NextFunction, Request, Response } from 'express';
import passport from '../lib/passport';

const authCheck = (req: Request, res: Response, next: NextFunction) => {
  if (req.path.startsWith('/api/user')) {
    return passport.authenticate('jwt', { session: false })(req, res, next);
  }

  next();
};

export default authCheck;
