import mongoose from 'mongoose';
import User from '../models/user.model';
import { IUserRequest, TUserResultData } from '../types/user.types';

class UserService {
  constructor() {}

  async getByEmail(
    email: IUserRequest['email']
  ): Promise<TUserResultData | null> {
    const user = await User.findOne({ email });

    return user?.toObject() || null;
  }

  async getById(_id: mongoose.Types.ObjectId): Promise<TUserResultData | null> {
    const user = await User.findOne({ _id });

    return user?.toObject() || null;
  }

  async create(data: IUserRequest): Promise<TUserResultData> {
    const user = new User({ ...data });
    await user.save();

    return user.toObject();
  }
}

export default new UserService();
