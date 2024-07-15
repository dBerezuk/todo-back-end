import { Response } from 'express';
import taskService from '../services/task.service';
import { IRequest } from '../types/base.types';
import { ITaskParams, ITaskRequest } from '../types/task.types';
import ErrorUtils from '../utils/errors';

class TaskController {
  async getUserTasks(req: IRequest, res: Response) {
    try {
      const tasks = await taskService.getUserTasks(req.user?._id!);

      return res.json({ tasks });
    } catch (error: any) {
      ErrorUtils.catchError(res, error);
    }
  }

  async createUserTask(req: IRequest<{}, ITaskRequest>, res: Response) {
    try {
      const data = req.body;

      const task = await taskService.createUserTask(req.user?._id!, data);

      return res.json({ task });
    } catch (error: any) {
      ErrorUtils.catchError(res, error);
    }
  }

  async updateUserTask(
    req: IRequest<ITaskParams, ITaskRequest>,
    res: Response
  ) {
    try {
      const data = req.body;
      const taskId = req.params._id!;

      const task = await taskService.updateUserTask(
        taskId,
        req.user?._id!,
        data
      );

      return res.json({ task });
    } catch (error: any) {
      ErrorUtils.catchError(res, error);
    }
  }

  async deleteUserTask(req: IRequest<ITaskParams, {}>, res: Response) {
    try {
      const taskId = req.params._id!;

      await taskService.deleteUserTask(taskId, req.user?._id!);

      return res.json({ message: 'The task was successfully deleted' });
    } catch (error: any) {
      ErrorUtils.catchError(res, error);
    }
  }
}

export default new TaskController();
