import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { Issued } from '../../models/issued';
import { Stock } from '../../models/stock';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	model_name: string;
	service_tag: string;
	department: string;
	date: string;
	issuedby: string;
	issuedto: string;
	items_issued: number
	user: string;
	category: string;
	serial: string;
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

		const {
			model_name,
			issuedby,
			issuedto,
			date,
			user,
			department,
			service_tag,
			items_issued,
			category,
			serial
		} = req.body;

		const availableStock = await Stock.findOne({ where: { stockName: model_name }})
		availableStock?.set({
			stockName: model_name,
			date,
			user,
			serial: '',
			category,
			totalAvailableNumber: (availableStock.totalAvailableNumber + issued.total) - items_issued
		})
		await availableStock?.save();
		issued.set({
			stockName: model_name,
			issuedBy: issuedby,
			issuedTo: issuedto,
			user,
			serial,
			category,
			date,
			service_tag,
			department,
			total: items_issued
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
