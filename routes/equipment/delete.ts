import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.delete(
	'/api/equipment/:name',
	async (req: Request<{ name: string }>, res: Response) => {
		const { name } = req.params;
		const equipment = await Equipment.deleteOne({ name });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);
