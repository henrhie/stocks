import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Stock } from '../../models/stock';
import { Date as _Date } from '../../models/date';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';
import { Activity } from '../../models/activity';

const router = express.Router();

interface ReqBody {
	model_name: string;
	service_tag: string;
	department: string;
	date: string;
	issuedby: string;
	issuedto: string;
	items_issued: number;
	user: string;
	category: string;
	serial: string;
}

router.post(
	'/api/issued',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { model_name,service_tag, department, category, issuedby, issuedto, items_issued, serial } = req.body
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');
		Issued.create({
			date: req.body.date ? req.body.date : date,
			user: req.body.user,
			stockName: model_name,
			issuedBy: issuedby,
			issuedTo: issuedto,
			total: items_issued,
			category,
			serial,
			service_tag,
			department
		})
			.then(async (equipment) => {
				addToCsv(equipment);
				const availableStock = await Stock.findOne({ where: { stockName: model_name }})
				console.log('stock: ', availableStock)
				if(!availableStock) {
					await Stock.create({
						stockName: model_name,
						date: req.body.date ? req.body.date: date,

						user: req.body.user,
						serial,
						totalAvailableNumber: -items_issued,
						category
					})
				}
				else {
					availableStock.set({
						...availableStock,
						totalAvailableNumber:
							availableStock.totalAvailableNumber - items_issued,
					});
					await availableStock.save();
				}
				await Activity.create({
					username: req.body.user,
					date: req.body.date ? req.body.date : date,
					time: _date.toLocaleTimeString(),
					activity: 'added item to issued table',
					item: model_name,
					number: items_issued,
				});
				return res.status(201).send(equipment);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addIssuedRouter };
