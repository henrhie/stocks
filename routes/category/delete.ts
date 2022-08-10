import express, { Request, Response } from 'express';
import { Category } from '../../models/category';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();



router.delete(
	'/api/category/:name',
	requireAuth,
	async (req: Request, res: Response) => {
    const { name } = req.params
		await Category.destroy({ where: { cat_name: name }});
		const categories = await Category.findAll()
    res.send(categories)
	}
);
export { router as deleteCategoryRouter };