import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	stockName: string;
	receivedBy: string;
	date: string;
	totalNumber: number;
	user: string
}

router.put(
	'/api/received/:serial',
	requireAuth,
	async (
		req: Request<{ serial: string }, {}, ReqBody>,
		res: Response
	) => {
		const { serial } = req.params;
		const received_ = await Received.findOne({
			where: {
				stockName: serial,
			},
		});
		if (!received_) {
			return res.status(401).send('received does not exist');
		}

		// const { stockName, receivedBy, totalNumber } = req.body;

		received_.set({
			...req.body
		});

		await received_.save();
		return res.send(received_);
	}
);

export { router as updateReceivedRouter };
