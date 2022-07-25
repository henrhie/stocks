import express, { Request, Response } from 'express';
import { Date as _Date } from '../../models/date';
import { Stock } from '../../models/stock';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/stock/:user_group',
	requireAuth,
	async (req: Request, res: Response) => {
		const { user_group } = req.params
		const stock = await Stock.findAll({ where: { user_group }} );
		return res.send(stock);
	}
);

export { router as showStockRouter };
