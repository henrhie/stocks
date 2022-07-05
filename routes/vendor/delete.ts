import express, { Request, Response } from 'express';
import { Vendor } from '../../models/vendor';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();



router.delete(
	'/api/vendor/:name',
	requireAuth,
	async (req: Request, res: Response) => {
    const { name } = req.params
		const vendors = await Vendor.destroy({ where: { name }});
    return res.send(vendors)
	}
);
export { router as deleteVendorRouter };