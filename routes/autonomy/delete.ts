import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/autonomy/:date/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, date } = req.params;
		const autonomy = await Autonomy.deleteOne({
			name,
			date,
		});
		const autonomies = await Autonomy.find();
		return res.send(autonomies);
	}
);

export { router as deleteAutonomyRouter };
