import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { PowerUsage } from '../../models/power-usage';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	facility: string;
	server_cons: number;
	total_cons: number;
	facility_rmks: string;
	date: string;
	user: string;
}

router.post(
	'/api/power-usage',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		const pue = parseFloat(
			(req.body.total_cons / req.body.server_cons).toFixed(2)
		);
		PowerUsage.create({
			...req.body,
			date: req.body.date ? req.body.date : date,
			pue,
		})
			.then(async (powerUsage) => {
				addToCsv(powerUsage);
				const _date_ = await _Date.create({
					date_artifact: req.body.date ? req.body.date : date,
				});
				return res.status(201).send(powerUsage);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addPowerUsageRouter };
