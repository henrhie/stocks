import express from 'express';
import { requireAuth } from './require-auth';

const router = express.Router();

router.get('/api/users/current_user', requireAuth, (req, res) => {
	// return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
