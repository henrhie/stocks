require('dotenv').config();
import express from 'express';

import path from 'path';
import cors from 'cors';

import { addIssuedRouter } from './routes/issued/add';
import { updateIssuedRouter } from './routes/issued/update';
import { deleteIssuedRouter } from './routes/issued/delete';
import { showIssuedRouter } from './routes/issued/show';


import { addReceivedRouter } from './routes/received/add';
import { deleteReceivedRouter } from './routes/received/delete';
import { showReceivedRouter } from './routes/received/show';
import { updateReceivedRouter } from './routes/received/update';


import { addStockRouter } from './routes/stock/add';
import { deleteStockRouter } from './routes/stock/delete';
import { showStockRouter } from './routes/stock/show';
import { updateStockRouter } from './routes/stock/update';


import { addRemarkRouter } from './routes/remarks/add';
import { showRemarksRouter } from './routes/remarks/show';


import { csvRouter } from './routes/issued/csv';

import { SigninRouter } from './routes/auth/signin';
import { SignoutRouter } from './routes/auth/signout';
import { SignupRouter } from './routes/auth/signup';
import { currentUserRouter } from './routes/auth/current-user';
import { validateUser } from './routes/auth/validate-user';


import './models/sequelizeInstance';

const app = express();

app.use(cors());

app.use(express.json());
app.use(validateUser);

app.use(addRemarkRouter);
app.use(showRemarksRouter);

app.use(addIssuedRouter);
app.use(updateIssuedRouter);
app.use(deleteIssuedRouter);
app.use(showIssuedRouter);
app.use(addReceivedRouter);
app.use(deleteReceivedRouter);
app.use(showReceivedRouter);
app.use(updateReceivedRouter);

app.use(currentUserRouter);
app.use(SignupRouter);
app.use(SignoutRouter);
app.use(SigninRouter);

app.use(addStockRouter);
app.use(deleteStockRouter);
app.use(showStockRouter);
app.use(csvRouter);
app.use(updateStockRouter);

app.use(express.static(path.join(__dirname, '_static')));
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, '_static/index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
