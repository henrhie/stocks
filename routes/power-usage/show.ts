import express, { Request, Response } from 'express';
import { _Date } from '../../models/date';
import { PowerUsage } from '../../models/power-usage';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/power-usage/:date',
	requireAuth,
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const powerUsage = await PowerUsage.findOne({ date });
		if (!powerUsage) {
			return res.send('not entries found');
		}
		return res.send(powerUsage);
	}
);

export { router as showPowerUsageRouter };
