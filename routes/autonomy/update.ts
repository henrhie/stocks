import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	autonomyA: string;
	autonomyB: string;
	ups_valueA: number;
	ups_valueB: number;
	autonomy_rmks: string;
	date: string;
}

router.put(
	'/api/autonomy/:date/:name',
	requireAuth,
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name, date } = req.params;
		let autonomy;
		if (name === 'UPS A Autonomy') {
			autonomy = await Autonomy.findOne({
				autonomyA: name,
				date,
			});
		} else if (name === 'UPS B Autonomy') {
			autonomy = await Autonomy.findOne({
				autonomyB: name,
				date,
			});
		}
		if (!autonomy) {
			throw new Error('autonomy does not exist');
		}

		const { autonomyA, autonomyB, ups_valueA, ups_valueB, autonomy_rmks } =
			req.body;

		autonomy.set({
			autonomyA: autonomyA ? autonomyA : autonomy?.autonomyA,
			autonomyB: autonomyB ? autonomyB : autonomy?.autonomyB,
			ups_valueA: ups_valueA ? ups_valueA : autonomy.ups_valueA,
			ups_valueB: ups_valueB ? ups_valueB : autonomy.ups_valueB,
			autonomy_rmks: autonomy_rmks ? autonomy_rmks : autonomy.autonomy_rmks,
		});

		await autonomy.save();
		return res.send(autonomy);
	}
);

export { router as updateAutonomyRouter };
