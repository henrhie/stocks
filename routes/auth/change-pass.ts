import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';
import { Password } from '../../services/password';


interface ReqBody {
	username: string;
	oldPass: string;
	newPass: string;
}

const router = express.Router();

router.post(
	'/api/users/changepass/:user',
	requireAuth,
	async (req: Request<{} , ReqBody>, res: Response) => {
		const { oldPass, newPass, username } = req.body;
		const user = await User.findOne({ where: { username } });
		console.log("Back User: ", user)
		if (!user) {
			return res.send('user not found');
		}
		const match = await Password.compare(user.password, oldPass)
		if (!match) {
			console.log('got here')
			return res.status(401).send('incorrect password');
		}
		const newPass_ = await Password.toHash(newPass)
		user.set({
			password: newPass_
		});
		await user.save()
		return res.status(201).send('Success');
	}
);

export { router as changePassRouter };
