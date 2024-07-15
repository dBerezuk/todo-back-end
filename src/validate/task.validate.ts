import { body } from 'express-validator';

class TaskValidate {
  createAndUpdate() {
    return [body('text').trim().notEmpty().withMessage('Enter a task')];
  }
}

export default new TaskValidate();
