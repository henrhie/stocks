import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { Date as _Date } from '../../models/date';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	autonomy: string;
	value: number;
	autonomy_rmks: string;
	date: string;
	user: string;
}

router.post(
	'/api/autonomy',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');

		console.log('req.body ===> ', req.body);
		Autonomy.create({
			...req.body,
			date: req.body.date ? req.body.date : date,
		})
			.then(async (autonomy) => {
				addToCsv(autonomy);
				await _Date.create({
					date_artifact: req.body.date ? req.body.date : date,
				});
				return res.status(201).send(autonomy);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addAutonomyRouter };
