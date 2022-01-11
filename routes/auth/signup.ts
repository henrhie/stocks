import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import { token } from '../../env/secrets';

interface ReqBody {
	name: string;
	username: string;
	password: string;
}

const router = express.Router();

router.post(
	'/api/users/signup',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { name, username, password } = req.body;

		const existingUser = await User.findOne({ username });
		if (existingUser) {
			throw new Error('user with email already exists');
		}

		User.build({
			name,
			username,
			password,
		}).save((err, user) => {
			const userJwt = jwt.sign(
				{
					id: user.id,
					username: user.username,
					name: name,
				},
				token
			);
			req.session = { jwt: userJwt };
			res.status(201).send(user);
		});
	}
);

export { router as SignupRouter };
