import express, { Request, Response } from 'express';
import { Activity } from '../../models/activity';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get(
	'/api/activity',
	requireAuth,
	async (req: Request, res: Response) => {
		const activities = await Activity.findAll();
		return res.send(activities);
	}
);
export { router as showActivitiesRouter };
