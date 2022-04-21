import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/issued/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name } = req.params;

		const issuedNumber = await Issued.destroy({
			where: { stockName: name },
		});
		const remainingIssues = await Issued.findAll()
		res.send({ issued: remainingIssues });
	}
);

export { router as deleteIssuedRouter };
