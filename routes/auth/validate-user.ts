import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { token } from '../../env/secrets';

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

interface UserPayload {
	name: string;
	id: string;
	username: string;
}

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
