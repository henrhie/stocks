import express, { Request, Response } from 'express';
import { Vendor } from '../../models/vendor';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/vendor',
	requireAuth,
	async (req: Request, res: Response) => {
		const vendors = await Vendor.findAll();
    return res.send(vendors)
	}
);
export { router as showVendorsRouter };