import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Password } from '../../services/password';
import { User } from '../../models/user';
import { token } from '../../env/secrets';

interface ReqBody {
	c_number: string;
	password: string;
}

const router = express.Router();

router.post(
	'/api/users/signin',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { c_number, password } = req.body;
		const user = await User.findOne({ c_number });
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
				c_number: user.c_number,
				name: user.name,
			},
			token
		);
		req.session = { jwt: userJwt };
		return res.status(201).send(user);
	}
);

export { router as SigninRouter };
