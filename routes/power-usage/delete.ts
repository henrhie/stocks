import express, { Request, Response } from 'express';
import { PowerUsage } from '../../models/power-usage';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/power-usage/:date',
	requireAuth,
	async (req: Request, res: Response) => {
		const { date } = req.params;
		const powerUsage = await PowerUsage.destroy({ where: { date } });

		res.send({ powerUsage });
	}
);

export { router as deletePowerUsageRouter };
