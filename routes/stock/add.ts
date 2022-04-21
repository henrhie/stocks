import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { Stock } from '../../models/stock';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	stockName: string;
	numberReceived: number;
	numberIssued: number;
	date: string;
	user: string;
}

router.post(
	'/api/stock',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		Stock.create({
			...req.body,
			date: req.body.date ? req.body.date : date,
			totalAvailableNumber: req.body.numberReceived - req.body.numberIssued
		})
			.then(async (stock) => {
				addToCsv(stock);
				const _date_ = await _Date.create({
					date_artifact: req.body.date ? req.body.date : date,
				});
				return res.status(201).send(stock);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addStockRouter };
