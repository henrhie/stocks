import express, { Request, Response } from 'express';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	stockName: string;
	numberReceived: number;
	numberIssued: number; 
	date: string;
}

router.put(
	'/api/stock/:name',
	requireAuth,
	async (req: Request<{ name: string }, {}, ReqBody>, res: Response) => {
		const { name } = req.params;
		const stock = await Stock.findOne({ where: { stockName: name } });
		if (!stock) {
			return res.send('entry does not exist');
		}

		const { stockName, numberIssued, numberReceived } = req.body;

		stock.set({
			stockName,
			totalAvailableNumber: numberReceived - numberIssued,
			numberIssued,
			numberReceived
		});

		await stock.save();
		return res.send(stock);
	}
);

export { router as updateStockRouter };
