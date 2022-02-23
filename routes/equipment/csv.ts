import express, { Request, Response } from 'express';
import { writeFile } from 'fs';
import { Equipment } from '../../models/equipment';

import { generateCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/equipment/csv/:date',
	requireAuth,
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const equipment = await Equipment.findAll({ where: { date } });
		if (!equipment) {
			throw new Error('not entries for this date');
		}
		const _equipment_ = equipment.map((doc) => {
			const row = doc;
			return row;
		});
		const csvFile = generateCsv(_equipment_);
		writeFile('splunk.data.csv', csvFile, function (err) {
			if (err) {
				return res.status(501).send('bad file!');
			}
			res.send('csv file generated');
		});
	}
);

export { router as csvRouter };
