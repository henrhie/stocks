import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
	name: string;
	id: string;
	c_number: string;
}

export const currentUser = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (!req.session?.jwt) return next();

	try {
		const payload = jwt.verify(
			req.session.jwt,
			process.env.JWT_KEY!
		) as UserPayload;
		if (payload) req.currentUser = payload;
	} catch (err) {}

	next();
};
