import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, date } = req.params;

		const issuedNumber = await Issued.destroy({
			where: { stockName: name, date },
		});
		res.send({ deleteNumber: issuedNumber });
	}
);

export { router as deleteIssuedRouter };
