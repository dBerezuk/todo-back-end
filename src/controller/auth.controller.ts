import { Response } from 'express';
import { IUserRequest, IUserRequestRegister } from '../types/user.types';
import ErrorUtils, { Unauthorized } from '../utils/errors';
import authService from './../services/auth.service';
import { IRequest } from './../types/base.types';

class AuthController {
	constructor() {}

	async register(req: IRequest<{}, IUserRequestRegister>, res: Response) {
		try {
			const { password_repeat, ...data } = req.body;

			const {
				tokens: { accessToken, refreshToken },
				user,
			} = await authService.register(data);

			authService.addRefreshTokenResponse(res, refreshToken);

			res.json({
				accessToken,
				user,
			});
		} catch (error: any) {
			ErrorUtils.catchError(res, error);
		}
	}

	async login(req: IRequest<{}, IUserRequest>, res: Response) {
		try {
			const data = req.body;

			const {
				tokens: { accessToken, refreshToken },
				user,
			} = await authService.login(data);

			authService.addRefreshTokenResponse(res, refreshToken);

			res.json({
				accessToken,
				user,
			});
		} catch (error: any) {
			ErrorUtils.catchError(res, error);
		}
	}

	async getNewTokens(req: IRequest, res: Response) {
		try {
			const { refreshToken } = req.cookies;

			if (!refreshToken) {
				authService.removeRefreshTokenFromResponse(res);
				throw new Unauthorized('Refresh token not passed');
			}

			const { tokens, user } = await authService.getNewTokens(refreshToken);

			authService.addRefreshTokenResponse(res, tokens.refreshToken);

			return res.json({
				accessToken: tokens.accessToken,
				user,
			});
		} catch (error: any) {
			ErrorUtils.catchError(res, error);
		}
	}

	logout(req: IRequest, res: Response) {
		try {
			authService.removeRefreshTokenFromResponse(res);

			return res.json({
				message: 'You have successfully logged out',
			});
		} catch (error: any) {
			ErrorUtils.catchError(res, error);
		}
	}
}

export default new AuthController();
