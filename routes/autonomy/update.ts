import express, { Request, Response } from 'express';
import { Autonomy } from '../../models/autonomy';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	autonomy: string;
	value: number;
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
		const autonomy_ = await Autonomy.findOne({
			name,
			date,
		});
		if (!autonomy_) {
			return res.status(401).send('autonomy does not exist');
		}

		const { autonomy, value, autonomy_rmks } = req.body;

		autonomy_.set({
			autonomy: autonomy ? autonomy : autonomy_.autonomy,
			value: value ? value : autonomy_.value,
			autonomy_rmks: autonomy_rmks ? autonomy_rmks : autonomy_.autonomy_rmks,
		});

		await autonomy_.save();
		return res.send(autonomy);
	}
);

export { router as updateAutonomyRouter };
