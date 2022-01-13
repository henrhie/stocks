import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name',
	requireAuth,
	async (req: Request, res: Response) => {
		const { name, date } = req.params;
		// const user = await User.findOne({ name: (req as any).currentUser.name });
		// console.log('user: ', user);
		// if (user?.access_level !== 'admin') {
		// 	return res.status(401).send('Not authorized for this operation');
		// }
		const equipment = await Equipment.deleteOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);

export { router as deleteRouter };
