import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	received_name: string;
	receivedby: string;
	date: string;
	vendor: string;
	items_received: number
	user: string
}

router.put(
	'/api/received/:name',
	requireAuth,
	async (
		req: Request<{ name: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name } = req.params;
		const received_ = await Received.findOne({
			where: {
				stockName: name,
			},
		});
		if (!received_) {
			return res.status(401).send('received does not exist');
		}

		const { received_name, receivedby, vendor, items_received, user, date } = req.body;

		received_.set({
			stockName: received_name,
			receivedBy: receivedby,
			vendor,
			totalNumber: items_received,
			user,
			date
		});

		await received_.save();
		return res.send(received_);
	}
);

export { router as updateReceivedRouter };
