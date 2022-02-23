import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// if (!req.currentUser) {
	// 	res.send('Not authorized for this operation');
	// }
	next();
};
