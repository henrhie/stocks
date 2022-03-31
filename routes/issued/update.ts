import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

// const equipmentToKVA: { [key: string]: number } = {
// 	'AVR 1 (250 kVA)': 250.0,
// 	'AVR 2 (250 kVA)': 250.0,
// 	'UPS A (120 kVA)': 120.0,
// 	'UPS B (120 kVA)': 120.0,
// 	'Genset A (400 kVA)': 400.0,
// 	'Genset B (400 kVA)': 400.0,
// };

interface ReqBody {
	stockName: string;
	serialNumber: string;
	issuedBy: string;
	issuedTo: string;
	user: string;
}

router.put(
	'/api/equipment/:date/:name',
	requireAuth,
	async (
		req: Request<{ name: string; date: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name, date } = req.params;
		const issued = await Issued.findOne({
			where: { stockName: name, date },
		});
		if (!issued) {
			throw new Error('equipment does not exist');
		}

		const {
			stockName,
			serialNumber,
			issuedBy,
			issuedTo,
			user,
		} = req.body;


		issued.set({
			stockName,
			serialNumber,
			issuedBy,
			issuedTo,
			user
		});

		await issued.save();
		return res.send(issued);
	}
);

export { router as updateIssuedRouter };
