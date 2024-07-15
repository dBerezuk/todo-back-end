import bcrypt from 'bcryptjs';
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import {
	EJwtOptions,
	IAuthResponse,
	IAuthTokens,
	jwtOptions,
} from '../types/auth.types';
import { IUserRequest } from '../types/user.types';
import { NotFound, Unauthorized } from '../utils/errors';
import userService from './user.service';

class AuthService {
	private EXPIRE_DAY_REFRESH_TOKEN = 15;
	private REFRESH_TOKEN_NAME = 'refreshToken';

	constructor() {}

	async register(data: IUserRequest): Promise<IAuthResponse> {
		const hashPassword: string = await bcrypt.hash(data.password, 10);

		const { password, ...user } = await userService.create({
			...data,
			password: hashPassword,
		});

		const tokens = this.createTokens(user._id);

		return { tokens, user };
	}

	async login({
		email: emailRequest,
		password: passwordRequest,
	}: IUserRequest): Promise<IAuthResponse> {
		const user = await userService.getByEmail(emailRequest);

		if (!user) throw new NotFound('Email or password is incorrect');

		const { password, ...userData } = user;

		const checkPassword = await bcrypt.compare(passwordRequest, password);

		if (!checkPassword)
			throw new Unauthorized('Email or password is incorrect');

		const tokens = this.createTokens(user._id);

		return {
			tokens,
			user: {
				...userData,
			},
		};
	}

	async getNewTokens(refreshToken: string): Promise<IAuthResponse> {
		const result = jwt.verify(refreshToken, process.env.APP_KEY!) as {
			_id: mongoose.Types.ObjectId;
		};

		if (!result) throw new Unauthorized('Invalid refresh token');

		const user = await userService.getById(result._id);

		if (!user) throw new NotFound('User is not found');

		const { password, ...userData } = user;

		const tokens = this.createTokens(userData._id);

		return {
			tokens,
			user: {
				...userData,
			},
		};
	}

	private createTokens(_id: string): IAuthTokens {
		const options: jwtOptions = {
			issuer: EJwtOptions.ISSUER,
			audience: EJwtOptions.AUDIENCE,
		};

		const accessToken = jwt.sign({ _id }, process.env.APP_KEY!, {
			expiresIn: '15m',
			...options,
		});

		const refreshToken = jwt.sign({ _id }, process.env.APP_KEY!, {
			expiresIn: '15d',
			...options,
		});

		return { accessToken, refreshToken };
	}

	addRefreshTokenResponse(res: Response, refreshToken: string) {
		const expiresIn = new Date();
		expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

		res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
			httpOnly: true,
			domain: 'localhost',
			expires: expiresIn,
			secure: false,
			// sameSite: 'none',
		});
	}

	removeRefreshTokenFromResponse(res: Response) {
		res.cookie(this.REFRESH_TOKEN_NAME, '', {
			httpOnly: true,
			domain: 'localhost',
			secure: false,
			expires: new Date(0),
			// sameSite: 'none',
		});
	}
}

export default new AuthService();
