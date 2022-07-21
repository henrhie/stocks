import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	model_name: string;
	service_tag: string;
	receivedby: string;
	date: string;
	vendor: string;
	items_received: number;
	user: string;
	category: string;
	serial: string;
}

router.post(
	'/api/received',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const _date = new Date();
		const date = _date.toLocaleDateString().replace('/', '-').replace('/', '-');

		console.log('req.body ===> ', req.body);

		const { model_name,service_tag, category, receivedby, vendor, items_received, user, serial } = req.body

		Received.create({
			stockName: model_name,
			receivedBy: receivedby,
			service_tag,
			vendor,
			totalNumber: items_received,
			user,
			date: req.body.date ? req.body.date : date,
			category,
			serial,
		})
			.then(async (received) => {
				addToCsv(received);
		const availableStock = await Stock.findOne({ where: { stockName: model_name }})
				if(!availableStock) {
					await Stock.create({
						stockName: model_name,
						date: req.body.date ? req.body.date: date,
						user,
						serial,
						totalAvailableNumber: items_received,
						category,
					});
				} else {
					availableStock.set({
						...availableStock,
						totalAvailableNumber:
							+availableStock.totalAvailableNumber + +items_received,
					});
					await availableStock.save();
				}
				await Activity.create({
					username: req.body.user,
					date: req.body.date ? req.body.date : date,
					time: _date.toLocaleTimeString(),
					activity: 'added item to received table',
					item: model_name,
					number: items_received,
				});
				return res.status(201).send(received);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addReceivedRouter };
