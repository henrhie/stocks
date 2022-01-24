import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { _Date } from '../../models/date';
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
		const autonomy = Autonomy.build({
			...req.body,
			date: req.body.date ? req.body.date : date,
		});

		addToCsv(autonomy.toObject());

		autonomy
			.save()
			.then(async () => {
				const _date_ = _Date.build({
					date_artifact: req.body.date ? req.body.date : date,
				});
				await _date_.save();
				return res.status(201).send(autonomy);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addAutonomyRouter };
