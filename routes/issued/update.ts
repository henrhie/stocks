import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { Issued } from '../../models/issued';
import { Stock } from '../../models/stock';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	issue_name: string;
	date: string;
	issuedby: string;
	issuedto: string;
	user: string;
	items_issued: number;
}

router.put(
	'/api/issued/:name',
	requireAuth,
	async (req: Request<{ name: string }, {}, ReqBody>, res: Response) => {
		const { name } = req.params;
		const issued = await Issued.findOne({
			where: { stockName: name },
		});
		if (!issued) {
			throw new Error('equipment does not exist');
		}

		const { issue_name, issuedby, issuedto, date, user, items_issued } =
			req.body;

		const availableStock = await Stock.findOne({
			where: { stockName: issue_name },
		});
		availableStock?.set({
			stockName: issue_name,
			date,
			user,
			serial: '',
			totalAvailableNumber:
				availableStock.totalAvailableNumber + issued.total - items_issued,
		});

		await availableStock?.save();
		issued.set({
			stockName: issue_name,
			issuedBy: issuedby,
			issuedTo: issuedto,
			user,
			total: items_issued,
		});

		const _date = new Date();
		const _date_ = _date
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		await Activity.create({
			username: req.body.user,
			date: _date_,
			time: _date.toLocaleTimeString(),
			activity: 'updated item on issued table',
			item: name,
			number: items_issued,
		});

		await issued.save();
		return res.send(issued);
	}
);

export { router as updateIssuedRouter };
