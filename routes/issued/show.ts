import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { Issued } from '../../models/issued';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/issued/:name',
	requireAuth,
	async (req: Request<{ name: string }>, res: Response) => {
		const { name } = req.params;
		const issued = await Issued.findOne({
			where: { stockName: name },
		});
		console.log(issued);
		if (!issued) {
			throw new Error('could not find issued');
		}
		return res.send(issued);
	}
);

router.get(
	'/api/issued',
	async (req: Request<{ }>, res: Response) => {
		const issued = await Issued.findAll();
		if (!issued) {
			throw new Error('could not find issued');
		}
		return res.send({ issued });
	}
);

export { router as showIssuedRouter };
