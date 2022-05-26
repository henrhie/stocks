import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/users',
	requireAuth,
	async (req: Request<{ }>, res: Response) => {
		let users = await User.findAll();
    users.forEach((user) => {
      user.password = ''
    })
		return res.send(users);
	}
);

export { router as showUserRouter };