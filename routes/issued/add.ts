import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { Date as _Date } from '../../models/date';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

// const equipmentToKVA: any = {
// 	'AVR 1 (250 kVA)': 250.0,
// 	'AVR 2 (250 kVA)': 250.0,
// 	'UPS A (120 kVA)': 120.0,
// 	'UPS B (120 kVA)': 120.0,
// 	'Genset A (400 kVA)': 400.0,
// 	'Genset B (400 kVA)': 400.0,
// };

interface ReqBody {
	stockName: string;
	date: string;
	serialNumber: string;
	issuedBy: string;
	issuedTo: string;
	user: string;
}

router.post(
	'/api/issued',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');
		Issued.create({
			...req.body,
			date: req.body.date ? req.body.date : date,
			user: req.body.user,
		})
			.then(async (equipment) => {
				addToCsv(equipment);
				await _Date.create({
					date_artifact: req.body.date ? req.body.date : date,
				});
				return res.status(201).send(equipment);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addIssuedRouter };
