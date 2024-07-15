import express from 'express';
import validateResult from '../middleware/validateResult';
import authValidate from '../validate/auth.validate';
import AuthController from './../controller/auth.controller';

const router = express.Router();

router.post(
	'/register',
	authValidate.register(),
	validateResult,
	AuthController.register
);

router.post(
	'/login',
	authValidate.login(),
	validateResult,
	AuthController.login
);

router.get('/new-tokens', AuthController.getNewTokens);

router.get('/logout', AuthController.logout);

export default router;
