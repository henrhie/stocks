import express, { Request, Response } from 'express';
import { Vendor } from '../../models/vendor';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	name: string,
	contact: string,
	email: string,
	products: string,
	user: string
}

router.post(
	'/api/vendors',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		Vendor.create({
			...req.body
		})
			.then(async (vendor) => {
				const vendors = await Vendor.findAll()
        res.send(vendors)
			})
			.catch((err) => {
				console.log(err);
			});
	}
);
export { router as addVendorRouter };