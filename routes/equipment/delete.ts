import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name',
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		const equipment = await Equipment.deleteOne({ name, date });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);

<<<<<<< HEAD
export { router as deleteRouter };
=======
export { router as DeleteRouter };
>>>>>>> 737c6f2fe1137cb9008f10cb618b8f28c58ef261
