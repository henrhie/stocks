import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { token } from '../../env/secrets';

interface ReqBody {
	name: string;
	username: string;
	password: string;
	access_level: string;
}

const router = express.Router();

router.post(
	'/api/users/signup',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { name, username, password, access_level } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			return res.send('user with this username already exists');
		}

		User.build({
			name,
			username,
			password,
			access_level,
		}).save((err, user) => {
			const userJwt = jwt.sign(
				{
					id: user.id,
					username: user.username,
					name: name,
					access_level: user.access_level,
				},
				token
			);
			// req.session = { jwt: userJwt };
			res.status(201).send({ user, token: userJwt });
		});
	}
);

export { router as SignupRouter };
