import express, { Request, Response } from 'express';
import { Vendor } from '../../models/vendor';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();



router.delete(
	'/api/vendors/:name',
	requireAuth,
	async (req: Request, res: Response) => {
    const { name } = req.params
		await Vendor.destroy({ where: { name }});
		const vendors = await Vendor.findAll()
    res.send(vendors)
	}
);
export { router as deleteVendorRouter };