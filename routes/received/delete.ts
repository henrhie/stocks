import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/received/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name } = req.params;
		const _ = await Received.destroy({
			where: {
				stockName: name,
			},
		});
		const issued = await Issued.findOne({ where: { stockName: name }})
		if(!issued) {
			const _  = await Stock.destroy({ where: { stockName: name }})
		}
		else {
			const totalItem = await Stock.findOne({ where: { stockName: name }})
			totalItem?.set({ ...totalItem, totalAvailableNumber: issued.total})
		}
		const receivedItems = await Received.findAll();
		return res.send({received: receivedItems});
	}
);

export { router as deleteReceivedRouter };
