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
		const powerUsage = await PowerUsage.findOne({ where: { date } });
		if (!powerUsage) {
			return res.send('power usage does not exist');
		}

		let pue;
		const { facility, server_cons, total_cons, facility_rmks } = req.body;
		const server_cons_ = server_cons ? server_cons : powerUsage.server_cons;
		const total_cons_ = total_cons ? total_cons : powerUsage.total_cons;
		if (server_cons_ && total_cons_) {
			pue = parseFloat((total_cons_ / server_cons_).toFixed(2));
		}

		powerUsage.set({
			facility: facility ? facility : powerUsage.facility,
			server_cons: server_cons ? server_cons : powerUsage.server_cons,
			total_cons: total_cons ? total_cons : powerUsage.total_cons,
			facility_rmks: facility_rmks ? facility_rmks : powerUsage.facility_rmks,
			pue: pue ? pue : powerUsage.pue,
		});

		await powerUsage.save();
		return res.send(powerUsage);
	}
);

export { router as updatePowerUsageRouter };
