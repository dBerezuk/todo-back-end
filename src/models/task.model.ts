import { model, Schema } from 'mongoose';
import { TTaskSchema } from '../types/task.types';

const taskSchema = new Schema(
  {
    text: {
      type: String,
      maxlength: 80,
      require: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      require: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default model<TTaskSchema>('Task', taskSchema);
