import { Response } from 'express';
import { IRequest } from '../types/base.types';

class UserController {
  async userData(req: IRequest, res: Response) {
    const { password, ...user } = req.user!;

    return res.json({ ...user });
  }
}

export default new UserController();
