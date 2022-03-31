import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { Date as _Date } from '../../models/date';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	stockName: string;
	serialNumber: string;
	receivedBy: string;
	date: string;
	totalReceived: number;
	user: string
}

router.post(
	'/api/received',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		console.log('req.body ===> ', req.body);
		Received.create({
			...req.body,
			date: req.body.date ? req.body.date : date,
		})
			.then(async (received) => {
				addToCsv(received);
				await _Date.create({
					date_artifact: req.body.date ? req.body.date : date,
				});
				return res.status(201).send(received);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addReceivedRouter };
