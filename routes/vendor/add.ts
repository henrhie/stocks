import express, { Request, Response } from 'express';
import { Vendor } from '../../models/vendor';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	name: string
}

router.post(
	'/api/vendor',
	requireAuth,
	async (req: Request<{}, {}, ReqBody>, res: Response) => {
		const { name } = req.body
		Vendor.create({
			name
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