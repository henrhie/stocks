import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import { currentUser } from './services/current-user';
import { SignupRouter } from './routes/signup';
import { SigninRouter } from './routes/signin';
import { SignoutRouter } from './routes/signout';

const app = express();

app.use(express.json());
app.use(
	cookieSession({
		secure: false,
		signed: false,
	})
);

app.use(currentUser);
app.use(SignupRouter);
app.use(SigninRouter);
app.use(SignoutRouter);

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
