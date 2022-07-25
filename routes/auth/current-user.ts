import express from 'express';
import { requireAuth } from './require-auth';

declare global {
	namespace Express {
		interface Request {
			currentUser?: UserPayload;
		}
	}
}

export interface UserPayload {
	name: string;
	id: string;
	username: string;
	access_level: string;
	user_group: string
}


const router = express.Router();

router.get('/api/users/current_user',  (req, res) => {
	return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
