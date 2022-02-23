import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, date } = req.params;

		const equipmentNumber = await Equipment.destroy({
			where: { equipment_name: name, date },
		});
		res.send({ deleteNumber: equipmentNumber });
	}
);

export { router as deleteRouter };
