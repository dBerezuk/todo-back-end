import { model, Schema } from 'mongoose';
import { TUserSchema } from '../types/user.types';

const userSchema = new Schema(
  {
    email: {
      type: String,
      maxlength: 256,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      maxlength: 60,
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<TUserSchema>('User', userSchema);
