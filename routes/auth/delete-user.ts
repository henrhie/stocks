import express from 'express';
import { User } from '../../models/user';
import { requireAuth } from './require-auth';

const router = express.Router();

router.delete('/api/users/:username', requireAuth, async (req, res) => {
	const { username } = req.params;

  await User.destroy({ where: { username }})
  const userRest = await User.findAll();
  res.send(userRest)
});

export { router as deleteUserRouter };
