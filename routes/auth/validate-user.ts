import { UserPayload } from './current-user';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { token } from '../../env/secrets';

export const validateUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { authorization } = req.headers;
		if (!authorization) {
			return next();
		}
		const payload = jwt.verify(
			authorization.substring(7),
			token
		) as UserPayload;
		if (payload) req.currentUser = payload;
	} catch (err: any) {
		console.log(err.message);
	}

	next();
};
