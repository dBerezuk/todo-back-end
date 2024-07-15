import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateResult = (
	req: Request,
	res: Response,
	next: NextFunction
): NextFunction | void => {
	const errors = validationResult(req);

	if (errors.isEmpty()) return next();

	res.status(422).json({ formError: errors.mapped() });
};

export default validateResult;
