import express from 'express';

import authRoutes from './auth.routes';
import taskRouter from './task.routes';
import userRouter from './user.routes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/user/tasks', taskRouter);
router.use('/user', userRouter);

export default router;
