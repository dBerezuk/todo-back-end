import express from 'express';
import userController from '../controller/user.controller';

const router = express.Router();

router.get('/', userController.userData);

export default router;
