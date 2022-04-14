import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { Date as _Date } from '../../models/date';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/received/:serial',
	requireAuth,
	async (req: Request<{ serial: string }>, res: Response) => {
		const { serial } = req.params;
		const received_ = await Received.findOne({
			where: {
				serialNumber: serial
			},
		});
		if (!received_) {
			return res.status(401).send('not found');
		}
		return res.send(received_);
	}
);

router.get(
	'/api/received',
	async (req: Request, res: Response) => {
		const received = await Received.findAll();
		if (!received) {
			return res.status(401).send('not found');
		}
		return res.send({ received });
	}
);

export { router as showReceivedRouter };
