import express from 'express';

const router = express.Router();

router.get('/api/users/current_user', (req, res) => {
	return res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
