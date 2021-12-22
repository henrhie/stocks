import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name',
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		const equipment = await Equipment.deleteOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);

export { router as deleteRouter };
