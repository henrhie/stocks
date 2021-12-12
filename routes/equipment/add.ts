import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

interface ReqBody {
	name: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

router.post(
	'/api/equipment',
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const equipment = Equipment.build({ ...req.body });
		await equipment.save();
		res.status(201).send(equipment);
	}
);

export { router as AddRouter };
