import express, { Request, Response } from 'express';
import { Category } from '../../models/category';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

interface ReqBody {
	name: string,
	user_group: string,
	user: string
}

router.post(
	'/api/category/:user_group',
	requireAuth,
	async (req: Request<{}, ReqBody>, res: Response) => {
		console.log(req.body)
		Category.create({
			...req.body
		})
			.then(async (category) => {
				const categories = await Category.findAll()
        res.send(categories)
			})
			.catch((err: any) => {
				console.log(err);
			});
	}
);
export { router as addCategoryRouter };