import express, { Request, Response } from 'express';
import { _Date } from '../../models/date';
import { Equipment } from '../../models/equipment';

const router = express.Router();

router.get(
	'/api/equipment/:date/:name',
	async (req: Request<{ name: string; date: string }>, res: Response) => {
		const { name, date } = req.params;
		const equipment = await Equipment.findOne({ equipment_name: name, date });
		console.log(equipment);
		if (!equipment) {
			throw new Error('could not find equipment');
		}
		return res.send(equipment);
	}
);

router.get(
	'/api/equipment/:date',
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const equipment = await Equipment.find({ date });
		if (!equipment) {
			throw new Error('could not find equipment');
		}
		const _dates_ = await _Date.find({});
		let _dates = _dates_.map((date) => date.date_artifact);
		_dates = [...new Set(_dates)];
		if (!_dates) {
			throw new Error('not date entries');
		}
		return res.send({ equipment, dates: _dates });
	}
);

export { router as showRouter };
