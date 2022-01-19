import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

const equipmentToKVA: any = {
	'AVR 1 (350 KvA)': 250.0,
	'AVR 2 (350 KvA)': 250.0,
	'UPS A (120 KvA)': 120.0,
	'UPS B (120 KvA)': 120.0,
	'Genset A (400 KvA)': 400.0,
	'Genset B (400 KvA)': 400.0,
};

interface ReqBody {
	equipment_name?: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

router.put(
	'/api/equipment/:date/:name',
	requireAuth,
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name, date } = req.params;
		const equipment = await Equipment.findOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('equipment does not exist');
		}

		const { current_l1, current_l2, current_l3, power_kva, power_kw, remark } =
			req.body;

		equipment.set({
			equipment_name: req.body.equipment_name,
			current_l1: current_l1 ? current_l1 : equipment.current_l1,
			current_l2: current_l2 ? current_l2 : equipment.current_l2,
			current_l3: current_l3 ? current_l3 : equipment.current_l3,
			power_kva: power_kva ? power_kva : equipment.power_kva,
			power_kw: power_kw ? power_kw : equipment.power_kw,
			remark: remark ? remark : equipment.remark,
			utilization:
				req.body.power_kva && req.body.equipment_name
					? parseFloat(
							(
								req.body.power_kva / equipmentToKVA[req.body.equipment_name]
							).toFixed(2)
					  )
					: 0,
		});

		await equipment.save();
		return res.send(equipment);
	}
);

export { router as updateRouter };
