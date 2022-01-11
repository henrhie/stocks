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

const app = express();

app.use(cors());

app.use(express.json());
// app.use(
// 	cookieSession({
// 		secure: false,
// 		signed: false,
// 	})
// );

app.use(validateUser);

app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SignoutRouter);
app.use(SigninRouter);

app.use(addRouter);
app.use(updateRouter);
app.use(deleteRouter);
app.use(csvRouter);
app.use(showRouter);

const PORT = 8080;

mongoose
	.connect(mongoURL)
	.then(() => {
		console.log('connected to database');
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
