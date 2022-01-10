import express, { Request, Response } from 'express';
import { Equipment } from '../../models/equipment';
import { User } from '../../models/user';

const router = express.Router();

router.delete(
	'/api/equipment/:date/:name/:username',
	async (
		req: Request<{ name: string; date: string; username?: string }>,
		res: Response
	) => {
		const { name, date, username } = req.params;
		// const user = await User.findOne({ name: username });
		// // if (user?.access_level !== 'admin') {
		// // 	return res.status(401).send('Not authorized for this operation');
		// // }
		const equipment = await Equipment.deleteOne({ equipment_name: name, date });
		if (!equipment) {
			throw new Error('could not find equipment to delete');
		}
		res.send(equipment);
	}
);

export { router as deleteRouter };
