import express, { Request, Response } from 'express';
import { _Date } from '../../models/date';
import { PowerUsage } from '../../models/power-usage';
import { Remarks } from '../../models/remarks';
import { addToCsv } from '../../utils';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.post(
	'/api/remarks',
	requireAuth,
	async (req: Request<{}, {}, { remark: string }>, res: Response) => {
		const remark = Remarks.build({
			...req.body,
		});

		remark
			.save()
			.then(async () => {
				return res.status(201).send(remark);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addRemarkRouter };
