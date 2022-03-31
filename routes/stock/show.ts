import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/stock/:date',
	requireAuth,
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const stock = await Stock.findAll({ where: { date } });
		if (!stock) {
			return res.send('not entries found');
		}
		return res.send(stock);
	}
);

export { router as showStockRouter };
