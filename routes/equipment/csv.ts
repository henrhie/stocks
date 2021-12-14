import express, { Request, Response } from 'express';
import { writeFile } from 'fs';
import { Equipment } from '../../models/equipment';

import { generateCsv } from '../../utils';

const router = express.Router();

router.get('/api/equipment/csv', async (req: Request, res: Response) => {
	const equipment = await Equipment.find({});
	const _equipment_ = equipment.map((doc) => {
		const row = doc.toObject();
		delete row.__v;
		return row;
	});
	const csvFile = generateCsv(_equipment_);
	writeFile('splunk.data.csv', csvFile, function (err) {
		if (err) {
			return res.status(501).send('bad file!');
		}
		res.send('csv file generated');
	});
});

export { router as csvRouter };
