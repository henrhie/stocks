import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/autonomy/:date/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, date } = req.params;
		let autonomy;
		if (name === 'UPS A Autonomy') {
			autonomy = await Autonomy.deleteOne({
				autonomyA: name,
				date,
			});
		} else if (name === 'UPS B Autonomy') {
			autonomy = await Autonomy.deleteOne({
				autonomyB: name,
				date,
			});
		}

		if (!autonomy) {
			throw new Error('could not find equipment to delete');
		}
		res.send(autonomy);
	}
);

export { router as deleteAutonomyRouter };
