import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { Date as _Date } from '../../models/date';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/autonomy/:date/:name',
	requireAuth,
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		const autonomy_ = await Autonomy.findOne({
			where: {
				autonomy: name,
				date,
			},
		});
		if (!autonomy_) {
			return res.status(401).send('not found');
		}
		return res.send(autonomy_);
	}
);

router.get(
	'/api/autonomy/:date',
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const autonomy = await Autonomy.findAll({ where: { date } });
		if (!autonomy) {
			return res.status(401).send('not found');
		}
		return res.send({ autonomy });
	}
);

export { router as showAutonomyRouter };
