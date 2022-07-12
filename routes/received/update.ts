import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	received_name: string;
	receivedby: string;
	date: string;
	vendor: string;
	items_received: number;
	user: string;
	serial: string;
}

router.put(
	'/api/received/:name',
	requireAuth,
	async (
		req: Request<{ name: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name } = req.params;
		console.log('name: ', name)
		const issued_ = await Issued.findOne({
			where: {
				stockName: name,
			},
		});
		const received_ = await Received.findOne({
			where: {
				stockName: name,
			},
		});
		if (!issued_ && !received_) {
			return res.status(401).send('item does not exist');
		}

		const { received_name, receivedby, vendor, items_received, user, date, serial } = req.body;

		const availableStock = await Stock.findOne({ where: { stockName: received_name }})

		const newTotal = items_received - (issued_ ? issued_.total : 0);
		console.log('new total: ', newTotal);
		console.log('items received: ', items_received)
		availableStock?.set({
			stockName: received_name,
			date,
			user,
			serial,
			totalAvailableNumber: newTotal || availableStock.totalAvailableNumber
		})

		await availableStock?.save()

		received_?.set({
			stockName: received_name,
			receivedBy: receivedby,
			vendor,
			totalNumber: items_received,
			user,
			date
		});

		await received_?.save();
		return res.send(received_);
	}
);

export { router as updateReceivedRouter };
