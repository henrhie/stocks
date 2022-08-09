import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { Date as _Date } from '../../models/date';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/received/:user_group/:stockName',
	requireAuth,
	async (req: Request<{ stockName: string, user_group: string }>, res: Response) => {
		const { stockName, user_group } = req.params;
		const received_ = await Received.findOne({
			where: {
				stockName,
				user_group
			},
		});
		if (!received_) {
			return res.status(401).send('not found');
		}
		return res.send(received_);
	}
);

router.get(
	'/api/received/:user_group',
	async (req: Request, res: Response) => {
		const { user_group } = req.params
		const received = await Received.findAll({ where:{ user_group }});
		if (!received) {
			return res.status(401).send('not found');
		}
		return res.send({ received });
	}
);

export { router as showReceivedRouter };
