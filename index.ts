import express from 'express';
import mongoose = require('mongoose');
import cookieSession from 'cookie-session';
<<<<<<< HEAD

import { addRouter } from './routes/equipment/add';
import { updateRouter } from './routes/equipment/update';
import { deleteRouter } from './routes/equipment/delete';

import { mongoURL } from './env/secrets';
=======
>>>>>>> 737c6f2fe1137cb9008f10cb618b8f28c58ef261

const app = express();

app.use(express.json());
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

<<<<<<< HEAD
app.use(addRouter);
app.use(updateRouter);
app.use(deleteRouter);
=======

app.use(AddRouter);
app.use(DeleteRouter);
app.use(DeleteValueRouter);
app.use(UpdateRouter);

const PORT = 3000;
<<<<<<< HEAD
=======
>>>>>>> 737c6f2fe1137cb9008f10cb618b8f28c58ef261

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
