import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';

const router = express.Router();

interface ReqBody {
	equipment_name: string;
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
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		let { name, date } = req.params;
		console.log('name: ', name);
		console.log('date: ', date);
		const equipment = await Equipment.findOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('equipment does not exist');
		}

		const { current_l1, current_l2, current_l3, power_kva, power_kw, remark } =
			req.body;

		console.log('equipment before: ', equipment);

		equipment.set({
			equipment_name: req.body.equipment_name,
			current_l1: current_l1 ? current_l1 : equipment.current_l1,
			current_l2: current_l2 ? current_l2 : equipment.current_l2,
			current_l3: current_l3 ? current_l3 : equipment.current_l3,
			power_kva: power_kva ? power_kva : equipment.power_kva,
			power_kw: power_kw ? power_kw : equipment.power_kw,
			remark: remark ? remark : equipment.remark,
		});
		console.log('equipment after: ', equipment);
		await equipment.save();
		return res.send(equipment);
	}
);

export { router as updateRouter };
