import express from 'express';
import { User } from '../../models/user';
import { requireAuth } from './require-auth';

const router = express.Router();

router.post('/api/users/', requireAuth, async (req, res) => {

  const user = await User.create({ ...req.body })
  res.send(user)
});

export { router as addUserRouter };