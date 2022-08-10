import express, { Request, Response } from 'express';
import { Category } from '../../models/category';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/category/:user_group',
	requireAuth,
	async (req: Request, res: Response) => {
		const { user_group } = req.params
		const categories = await Category.findAll({ where: { user_group }})
    return res.send(categories)
	}
);
export { router as showCategorysRouter };