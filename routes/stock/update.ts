import express, { Request, Response } from 'express';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	stockName: string;
	totalAvailableNumber: number; 
	date: string;
}

router.put(
	'/api/stock/:date',
	requireAuth,
	async (req: Request<{ date: string }, {}, ReqBody>, res: Response) => {
		const { date } = req.params;
		const stock = await Stock.findOne({ where: { date } });
		if (!stock) {
			return res.send('entry does not exist');
		}

		const { stockName, totalAvailableNumber, } = req.body;

		stock.set({
			stockName,
			totalAvailableNumber
		});

		await stock.save();
		return res.send(stock);
	}
);

export { router as updateStockRouter };
