import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.delete(
	'/api/equipment/:name/:field_name',
	async (req: Request<{ name: string; field_name: string }>, res: Response) => {
		const { name, field_name } = req.params;
		const equipment = await Equipment.findOne({ name });
		if (!equipment) {
			throw new Error('equipment not found');
		}
		const equipmentObj = equipment.toObject();
		equipment.set({ ...equipmentObj, [field_name]: undefined });
		await equipment.save();
		res.send(equipment);
	}
);

export { router as DeleteValueRouter };
