import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { Issued } from '../../models/issued';
import { Received } from '../../models/received';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/issued/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name } = req.params;

		const issuedNumber = await Issued.destroy({
			where: { stockName: name },
		});
		const received = await Received.findOne({ where: { stockName: name }})
		if(!received) {
			const _  = await Stock.destroy({ where: { stockName: name }})
		}
		else {
			const totalItem = await Stock.findOne({ where: { stockName: name }})
			totalItem?.set({ ...totalItem, totalAvailableNumber: received.totalNumber})
		}
		const _date = new Date();
		const date = _date.toLocaleDateString().replace('/', '-').replace('/', '-');
		await Activity.create({
			username: req.body.user,
			date,
			time: _date.toLocaleTimeString(),
			activity: 'deleted item from issued table',
			item: name,
		});
		const remainingIssues = await Issued.findAll();
		res.send({ issued: remainingIssues });
	}
);

export { router as deleteIssuedRouter };
