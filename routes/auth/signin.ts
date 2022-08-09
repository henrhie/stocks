import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import { token } from '../../env/secrets';
import { Activity } from '../../models/activity'

interface ReqBody {
	username: string;
	password: string;
}

const router = express.Router();

router.post(
	'/api/users/signin',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { username, password } = req.body;
		const user = await User.findOne({ where: { username } });
		if (!user) {
			return res.send('username or password is incorrect');
		}

		const match = await Password.compare(user.password, password);
		if (!match) {
			return res.send('username or password incorrect');
		}

		const userJwt = jwt.sign(
			{
				id: user.id,
				username: user.username,
				name: user.name,
				access_level: user.access_level,
				user_group: user.user_group
			},
			token
		);
		const date = new Date().toLocaleDateString().replace('/', '-').replace('/', '-');
		const _date = new Date();
		// req.session = { jwt: userJwt };
		user.password = '';
		await Activity.create({
			username: user.username,
			date,
			time: _date.toLocaleTimeString(),
			activity: 'user signed in',
			item: '',
			number: 0,
		});
		return res.status(201).send({ user, token: userJwt });
	}
);

export { router as SigninRouter };
