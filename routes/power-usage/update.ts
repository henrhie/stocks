import express, { Request, Response } from 'express';
import { PowerUsage } from '../../models/power-usage';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	facility: string;
	server_cons: number;
	total_cons: number;
	facility_rmks: string;
	date: string;
}

router.put(
	'/api/power-usage/:date',
	requireAuth,
	async (req: Request<{ date: string }, {}, ReqBody>, res: Response) => {
		const { date } = req.params;
		const powerUsage = await PowerUsage.findOne({ date });
		if (!powerUsage) {
			return res.send('power usage does not exist');
		}

		const { facility, server_cons, total_cons, facility_rmks } = req.body;

		powerUsage.set({
			facility: facility ? facility : powerUsage.facility,
			server_cons: server_cons ? server_cons : powerUsage.server_cons,
			total_cons: total_cons ? total_cons : powerUsage.total_cons,
			facility_rmks: facility_rmks ? facility_rmks : powerUsage.facility_rmks,
		});

		await powerUsage.save();
		return res.send(powerUsage);
	}
);

export { router as updatePowerUsageRouter };
