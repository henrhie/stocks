import express from 'express';
import { currentUser } from '../../services/current-user';

const router = express.Router();

router.get('/api/users/current_user', currentUser, (req, res) => {
	return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
