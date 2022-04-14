import express, { Request, Response } from 'express';
import { writeFile } from 'fs';
import { Issued } from '../../models/issued';

import { generateCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/issued/csv',
	requireAuth,
	async (req: Request<{ date: string }>, res: Response) => {
		const { date } = req.params;
		const issued = await Issued.findAll({ where: { date } });
		if (!issued) {
			throw new Error('not entries for this date');
		}
		const _issued_ = issued.map((doc) => {
			const row = doc;
			return row;
		});
		const csvFile = generateCsv(_issued_);
		writeFile('splunk.data.csv', csvFile, function (err) {
			if (err) {
				return res.status(501).send('bad file!');
			}
			res.send('csv file generated');
		});
	}
);

export { router as csvRouter };
