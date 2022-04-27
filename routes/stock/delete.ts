// import express, { Request, Response } from 'express';
// import { Stock } from '../../models/stock';
// import { requireAuth } from '../auth/require-auth';

// const router = express.Router();

// router.delete(
// 	'/api/stock/:name',
// 	requireAuth,
// 	async (req: Request, res: Response) => {
// 		const { name } = req.params;
// 		const stock = await Stock.destroy({ where: { stockName: name } });

// 		res.send({ stock });
// 	}
// );

// export { router as deleteStockRouter };
