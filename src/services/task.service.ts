import Task from '../models/task.model';
import { ITaskRequest, TTaskResponse } from '../types/task.types';
import { NotFound } from '../utils/errors';

class TaskService {
  async getUserTasks(_id: string): Promise<TTaskResponse[]> {
    const tasks: TTaskResponse[] = await Task.find({ user: _id });

    return tasks;
  }

  async createUserTask(
    _id: string,
    data: ITaskRequest
  ): Promise<TTaskResponse> {
    const task = new Task({
      user: _id,
      ...data,
    });
    await task.save();

    return task.toObject();
  }

  async updateUserTask(
    taskId: string,
    userId: string,
    data: ITaskRequest
  ): Promise<TTaskResponse> {
    const task = await Task.findOneAndUpdate(
      {
        _id: taskId,
        user: userId,
      },
      data,
      {
        new: true,
      }
    );

    if (!task) throw new NotFound('Not found task');

    return task.toObject();
  }

  async deleteUserTask(taskId: string, userId: string) {
    const task = await Task.findOneAndDelete({
      _id: taskId,
      user: userId,
    });

    if (!task) throw new NotFound('Not found task');
  }
}

export default new TaskService();
