import express, { Request, Response } from 'express';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/stock/:date',
	requireAuth,
	async (req: Request, res: Response) => {
		const { date } = req.params;
		const stock = await Stock.destroy({ where: { date } });

		res.send({ stock });
	}
);

export { router as deleteStockRouter };
