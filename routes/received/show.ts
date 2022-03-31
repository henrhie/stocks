import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { Date as _Date } from '../../models/date';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/received/:date/:name',
	requireAuth,
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		const received_ = await Received.findOne({
			where: {
				stockName: name,
				date,
			},
		});
		if (!received_) {
			return res.status(401).send('not found');
		}
		return res.send(received_);
	}
);

router.get(
	'/api/received/:date',
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const received = await Received.findAll({ where: { date } });
		if (!received) {
			return res.status(401).send('not found');
		}
		return res.send({ received });
	}
);

export { router as showReceivedRouter };
