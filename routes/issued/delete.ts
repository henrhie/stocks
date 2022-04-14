import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/equipment/:serial',
	requireAuth,
	async (req: Request, res: Response) => {
		const { serial } = req.params;

		const issuedNumber = await Issued.destroy({
			where: { serialNumber: serial },
		});
		res.send({ deleteNumber: issuedNumber });
	}
);

export { router as deleteIssuedRouter };
