import express, { Request, Response } from 'express';
import { Remarks } from '../../models/remarks';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.post(
	'/api/remarks',
	requireAuth,
	async (
		req: Request<{}, {}, { payload: { remark: string } }>,
		res: Response
	) => {
		console.log('req.body ===>: ', req.body);
		Remarks.create({
			...req.body.payload,
		})
			.then(async (remark) => {
				const remarks = await Remarks.findAll();
				return res.status(201).send(remarks);
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addRemarkRouter };
