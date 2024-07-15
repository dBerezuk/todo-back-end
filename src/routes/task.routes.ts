import express from 'express';
import taskController from '../controller/task.controller';
import validateResult from '../middleware/validateResult';
import taskValidate from '../validate/task.validate';

const router = express.Router();

router.get('/', taskController.getUserTasks);

router.post(
	'/',
	taskValidate.createAndUpdate(),
	validateResult,
	taskController.createUserTask
);

router.patch(
	'/:_id',
	// taskValidate.createAndUpdate(),
	// validateResult,
	taskController.updateUserTask
);

router.delete('/:_id', taskController.deleteUserTask);

export default router;
