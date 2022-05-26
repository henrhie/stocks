import express from 'express';
import { User } from '../../models/user';
import { requireAuth } from './require-auth';

const router = express.Router();

router.put('/api/users/:username', requireAuth, async (req, res) => {
	const { username } = req.params;
  const { access_level } = req.body

  const user = await User.findOne({ where: { username }})
  user?.set({
    access_level
  })
  await user?.save()
  res.send(user)
});

export { router as updateUserRouter };
