import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { _Date } from '../../models/date';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/autonomy/:date/:name',
	requireAuth,
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		let autonomy;
		if (name === 'UPS A Autonomy') {
			autonomy = await Autonomy.findOne({
				autonomyA: name,
				date,
			});
		} else if (name === 'UPS B Autonomy') {
			autonomy = await Autonomy.findOne({
				autonomyB: name,
				date,
			});
		}
		if (!autonomy) {
			throw new Error('could not find autonomy');
		}
		return res.send(autonomy);
	}
);

router.get(
	'/api/autonomy/:date',
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const autonomy = await Autonomy.find({ date });
		if (!autonomy) {
			throw new Error('could not find autonomy');
		}
		return res.send({ autonomy });
	}
);

export { router as showAutonomyRouter };
