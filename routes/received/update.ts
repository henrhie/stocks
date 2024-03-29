import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { Issued } from '../../models/issued';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
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
	category: string,
	serial: string,
	user_group: string;
}

router.put(
	'/api/received/:user_group/:stockName',
	requireAuth,
	async (req: Request<{ stockName: string, user_group: string }, {}, ReqBody>, res: Response) => {
		const { stockName, user_group } = req.params;
		// console.log('name: ', name)
		const issued_ = await Issued.findOne({
			where: {
				stockName,
				user_group
			},
		});
		const received_ = await Received.findOne({
			where: {
				stockName,
				user_group
			},
		});
		if (!issued_ && !received_) {
			return res.status(401).send('item does not exist');
		}

		const { model_name, receivedby, vendor, items_received, user, date, serial,  } = req.body;

		const availableStock = await Stock.findOne({ where: { stockName, user_group }})

		const newTotal = items_received - (issued_ ? issued_.total : 0);
		console.log('new total: ', newTotal);
		console.log('items received: ', items_received);
		availableStock?.set({
			stockName,
			date,
			user,
			serial,
			totalAvailableNumber: newTotal || availableStock.totalAvailableNumber,
		});

		await availableStock?.save();

		received_?.set({
			stockName: model_name,
			receivedBy: receivedby,
			vendor,
			totalNumber: items_received,
			user,
			date,
		});
		
		await received_?.save();
		const _date = new Date();
		const _date_ = _date
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		await Activity.create({
			username: req.body.user,
			date: _date_,
			time: _date.toLocaleTimeString(),
			activity: 'updated item on received table',
			item: issued_?.stockName || '',
			number: items_received,
		});
		return res.send(received_);
	}
);

export { router as updateReceivedRouter };
