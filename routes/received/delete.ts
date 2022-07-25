import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Activity } from '../../models/activity';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/received/:user_group/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, user_group } = req.params;
		const _ = await Received.destroy({
			where: {
				stockName: name,
				user_group
			},
		});
		const issued = await Issued.findOne({ where: { stockName: name, user_group }})
		if(!issued) {
			const _  = await Stock.destroy({ where: { stockName: name, user_group }})
		}
		else {
			const totalItem = await Stock.findOne({ where: { stockName: name, user_group }})
			totalItem?.set({ ...totalItem, totalAvailableNumber: issued.total})
		}
		const receivedItems = await Received.findAll();

		const _date = new Date();
		const date = _date.toLocaleDateString().replace('/', '-').replace('/', '-');
		await Activity.create({
			username: req.body.user,
			date,
			time: _date.toLocaleTimeString(),
			activity: 'deleted item from received table',
			item: name,
		});
		return res.send({ received: receivedItems });
	}
);

export { router as deleteReceivedRouter };
