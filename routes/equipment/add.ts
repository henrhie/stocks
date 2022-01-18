import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { _Date } from '../../models/date';
import { addToCsv } from '../../utils';
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
	equipment_name: string;
	date: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
	username?: string;
}

router.post(
	'/api/equipment',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const date = new Date()
			.toLocaleDateString()
			.replace('/', '-')
			.replace('/', '-');
		const equipment = Equipment.build({
			...req.body,
			date: req.body.date ? req.body.date : date,
			utilization: req.body.power_kva
				? parseFloat(
						(
							req.body.power_kva / equipmentToKVA[req.body.equipment_name]
						).toFixed(3)
				  ) * 100
				: 0,
		});

		addToCsv(equipment.toObject());

		equipment
			.save()
			.then(async () => {
				const _date_ = _Date.build({
					date_artifact: req.body.date ? req.body.date : date,
				});
				await _date_.save();
				return res.status(201).send(equipment);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addRouter };
