import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';
import { Password } from '../../services/password';

const router = express.Router();

router.post(
	'/api/users/changepass',
	requireAuth,
	async (req: Request<{}>, res: Response) => {
		const { oldPass, newPass, username } = req.body;
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.send('user not found');
		}
		if (!Password.compare(user.password, oldPass)) {
			return res.send('incorrect password');
		}
		user.set({
			password: await Password.toHash(newPass),
		});
		await user.save()
		return res.status(201).send({ message: 'success'});
	}
);

export { router as changePassRouter };
