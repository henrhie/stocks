import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import { token } from '../../env/secrets';

interface ReqBody {
	email: string;
	password: string;
}

const router = express.Router();

router.post(
	'/api/users/signin',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('email or password is incorrect');
		}

		const match = await Password.compare(user.password, password);
		if (!match) {
			throw new Error('email or password is incorrect');
		}

		const userJwt = jwt.sign(
			{
				id: user.id,
				email: user.email,
			},
			token
		);
		req.session = { jwt: userJwt };
		return res.status(201).send(user);
	}
);

export { router as SigninRouter };
