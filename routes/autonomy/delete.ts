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
		if (!autonomy) {
			return res.status(401).send('could not find equipment to delete');
		}
		return res.send(autonomy);
	}
);

export { router as deleteAutonomyRouter };
