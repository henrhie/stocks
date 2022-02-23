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

		try {
			const existingUser = await User.findOne({ where: { username } });
			if (existingUser) {
				return res.send('user with this username already exists');
			}
		} catch (error: any) {
			return res.status(404).send(error);
		}

		User.create({
			name,
			username,
			password,
			access_level,
		})
			.then((user) => {
				const userJwt = jwt.sign(
					{
						id: user.id,
						username: user.username,
						name: name,
						access_level: user.access_level,
					},
					token
				);
				user.password = '';
				res.status(201).send({ user, token: userJwt });
			})
			.catch((err) => {
				res.status(404).send(err);
			});
	}
);

export { router as SignupRouter };
