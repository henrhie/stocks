import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.get(
	'/api/equipment/:date',
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { date } = req.params;
		const equipment = await Equipment.find({ date });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);

export { router as showRouter };
