import express, { Request, Response } from 'express';
import { Received } from '../../models/received';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/autonomy/:serial',
	requireAuth,
	async (req: Request, res: Response) => {
		const { serial } = req.params;
		const _ = await Received.destroy({
			where: {
				stockName: serial,
			},
		});
		const receivedItems = await Received.findAll();
		return res.send(receivedItems);
	}
);

export { router as deleteReceivedRouter };
