import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

const equipmentToKVA: any = {
	'AVR 1 (350 KvA)': 350,
	'AVR 2 (350 KvA)': 350,
	'UPS A (120 KvA)': 120,
	'UPS B (120 KvA)': 120,
	'Genset A (400 KvA)': 400,
	'Genset B (400 KvA)': 400,
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
		// const user = await User.findOne({ name: req.currentUser?.name });
		// // if (user && user?.access_level !== 'admin') {
		// // 	return res.status(401).send('Not authorized for this operation');
		// // }
		const equipment = await Equipment.findOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('equipment does not exist');
		}

		console.log('equipment: ', equipment);

		equipment.set({
			equipment_name: req.body.equipment_name
				? req.body.equipment_name
				: equipment.equipment_name,
			current_l1: req.body.current_l1
				? req.body.current_l1
				: equipment.current_l1,
			current_l2: req.body.current_l2
				? req.body.current_l2
				: equipment.current_l2,
			current_l3: req.body.current_l3
				? req.body.current_l3
				: equipment.current_l3,
			power_kw: req.body.power_kw ? req.body.power_kw : equipment.power_kw,
			power_kva: req.body.power_kva ? req.body.power_kva : equipment.power_kva,
			utilization:
				req.body.power_kva && req.body.equipment_name
					? parseFloat(
							(
								req.body.power_kva / equipmentToKVA[req.body.equipment_name]
							).toFixed(2)
					  )
					: 0,
			remark: req.body.remark ? req.body.remark : equipment.remark,
		});
		await equipment.save();
		return res.send(equipment);
	}
);

export { router as updateRouter };
