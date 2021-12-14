import express from 'express';
import mongoose = require('mongoose');
import cookieSession from 'cookie-session';

import { addRouter } from './routes/equipment/add';
import { updateRouter } from './routes/equipment/update';
import { deleteRouter } from './routes/equipment/delete';

import { mongoURL } from './env/secrets';

const app = express();

app.use(express.json());
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.use(addRouter);
app.use(updateRouter);
app.use(deleteRouter);

const PORT = 3000;

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
