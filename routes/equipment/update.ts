import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

const equipmentToKVA: { [key: string]: number } = {
	'AVR 1 (250 kVA)': 250.0,
	'AVR 2 (250 kVA)': 250.0,
	'UPS A (120 kVA)': 120.0,
	'UPS B (120 kVA)': 120.0,
	'Genset A (400 kVA)': 400.0,
	'Genset B (400 kVA)': 400.0,
};

interface ReqBody {
	equipment_name: string;
	current_l1: number;
	current_l2: number;
	current_l3: number;
	power_kw: number;
	power_kva: number;
	remark: string;
}

router.put(
	'/api/equipment/:date/:name',
	requireAuth,
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name, date } = req.params;
		const equipment = await Equipment.findOne({
			where: { equipment_name: name, date },
		});
		if (!equipment) {
			throw new Error('equipment does not exist');
		}

		const {
			current_l1,
			current_l2,
			current_l3,
			power_kva,
			power_kw,
			remark,
			equipment_name,
		} = req.body;

		const util_ = (power_kva / equipmentToKVA[equipment_name]) * 100;
		const utilization = parseFloat(util_.toFixed(2));
		console.log(equipmentToKVA[equipment_name]);
		console.log(typeof utilization);

		equipment.set({
			equipment_name: req.body.equipment_name,
			current_l1: current_l1,
			current_l2: current_l2,
			current_l3: current_l3,
			power_kva: power_kva,
			power_kw: power_kw,
			remark: remark,
			utilization,
		});

		await equipment.save();
		return res.send(equipment);
	}
);

export { router as updateRouter };
