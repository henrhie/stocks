import express from 'express';
import mongoose = require('mongoose');
// import cookieSession from 'cookie-session';

import { addRouter } from './routes/equipment/add';
import { updateRouter } from './routes/equipment/update';
import { deleteRouter } from './routes/equipment/delete';
import { csvRouter } from './routes/equipment/csv';

import { mongoURL } from './env/secrets';
import { showRouter } from './routes/equipment/show';

import cors from 'cors';
import { SigninRouter } from './routes/auth/signin';
import { SignoutRouter } from './routes/auth/signout';
import { SignupRouter } from './routes/auth/signup';
import { currentUserRouter } from './routes/auth/current-user';
import { validateUser } from './routes/auth/validate-user';
import { addAutonomyRouter } from './routes/autonomy/add';
import { deleteAutonomyRouter } from './routes/autonomy/delete';
import { showAutonomyRouter } from './routes/autonomy/show';
import { addPowerUsageRouter } from './routes/power-usage/add';
import { deletePowerUsageRouter } from './routes/power-usage/delete';
import { showPowerUsageRouter } from './routes/power-usage/show';
import { updatePowerUsageRouter } from './routes/power-usage/update';
import { updateAutonomyRouter } from './routes/autonomy/update';
import { addRemarkRouter } from './routes/remarks/add';
import { showRemarksRouter } from './routes/remarks/show';

import './models/sequelizeInstance';

const app = express();

app.use(cors());

app.use(express.json());
app.use(validateUser);

app.use(addRemarkRouter);
app.use(showRemarksRouter);

app.use(addAutonomyRouter);
app.use(deleteAutonomyRouter);
app.use(showAutonomyRouter);
app.use(addPowerUsageRouter);
app.use(deletePowerUsageRouter);
app.use(showPowerUsageRouter);
app.use(updatePowerUsageRouter);
app.use(updateAutonomyRouter);

app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SignoutRouter);
app.use(SigninRouter);

app.use(addRouter);
app.use(updateRouter);
app.use(deleteRouter);
app.use(csvRouter);
app.use(showRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
