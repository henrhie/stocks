import express, { Request, Response } from 'express';
import { Remarks } from '../../models/remarks';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get('/api/remarks', requireAuth, async (req: Request, res: Response) => {
	const remarks = await Remarks.findAll();
	return res.send(remarks);
});

export { router as showRemarksRouter };
