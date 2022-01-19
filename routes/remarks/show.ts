import express, { Request, Response } from 'express';
import { _Date } from '../../models/date';
import { PowerUsage } from '../../models/power-usage';
import { Remarks } from '../../models/remarks';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();

router.get('/api/remarks', requireAuth, async (req: Request, res: Response) => {
	const remarks = await Remarks.find();
	return res.send(remarks);
});

export { router as showRemarksRouter };
