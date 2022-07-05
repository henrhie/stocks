import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Stock } from '../../models/stock'
import { Date as _Date } from '../../models/date';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	issue_name: string;
	date: string;
	issuedby: string;
	issuedto: string;
	items_issued: number
	user: string;
	category: string
}

router.post(
	'/api/issued',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { issue_name, category, issuedby, issuedto, items_issued } = req.body
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');
		Issued.create({
			date: req.body.date ? req.body.date : date,
			user: req.body.user,
			stockName: issue_name,
			issuedBy: issuedby,
			issuedTo: issuedto,
			total: items_issued,
			category
		})
			.then(async (equipment) => {
				addToCsv(equipment);
				const availableStock = await Stock.findOne({ where: { stockName: issue_name }})
				console.log('stock: ', availableStock)
				if(!availableStock) {
					await Stock.create({
						stockName: issue_name,
						date: req.body.date ? req.body.date: date,
						user: req.body.user,
						serial: '',
						totalAvailableNumber: -items_issued
					})
				}
				else {
					
					availableStock.set({
						...availableStock,
						totalAvailableNumber: availableStock.totalAvailableNumber - items_issued
					})
					await availableStock.save()
				}
				return res.status(201).send(equipment);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addIssuedRouter };
