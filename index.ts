import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/auth/current-user';
import { SignupRouter } from './routes/auth/signup';
import { SigninRouter } from './routes/auth/signin';
import { SignoutRouter } from './routes/auth/signout';
import { AddRouter } from './routes/equipment/add';
import { DeleteRouter } from './routes/equipment/delete';
import { UpdateRouter } from './routes/equipment/update';

const app = express();

app.use(express.json());
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);

app.use(AddRouter);
app.use(DeleteRouter);
app.use(UpdateRouter);

const PORT = 3000;
const MONGODB_URL =
	'mongodb+srv://henrhie35:Tensorflow-35@cluster0.1tgyg.mongodb.net/portaldb?retryWrites=true&w=majority';

mongoose
	.connect(MONGODB_URL)
	.then(() => {
		console.log('connected to database');
		app.listen(PORT, () => {
			console.log(`server running on port ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(err);
	});
