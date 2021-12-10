import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/user';
import token from '../../env/jwt_key';

interface ReqBody {
	name: string;
	email: string;
	password: string;
}

const router = express.Router();

router.post(
	'/api/users/signup',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			throw new Error('user with email already exists');
		}

		User.build({
			name,
			email,
			password,
		}).save((err, user) => {
			const userJwt = jwt.sign(
				{
					id: user.id,
					email: user.email,
				},
				token
			);
			req.session = { jwt: userJwt };
			res.status(201).send(user);
		});
	}
);

export { router as SignupRouter };
