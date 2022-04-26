import express, { Request, Response } from 'express';
import { Issued } from '../../models/issued';
import { User } from '../../models/user';
import { requireAuth } from '../auth/require-auth';

const router = express.Router();


interface ReqBody {
	issue_name: string;
	date: string;
	issuedby: string;
	issuedto: string;
	user: string;
	items_issued: number
}

router.put(
	'/api/issued/:name',
	requireAuth,
	async (
		req: Request<{ name: string }, {}, ReqBody>,
		res: Response
	) => {
		const { name } = req.params;
		const issued = await Issued.findOne({
			where: { stockName: name },
		});
		if (!issued) {
			throw new Error('equipment does not exist');
		}

		const {
			issue_name,
			issuedby,
			issuedto,
			date,
			user,
			items_issued
		} = req.body;

		console.log('reqbody: ', req.body)


		issued.set({
			stockName: issue_name,
			issuedBy: issuedby,
			issuedTo: issuedto,
			user,
			total: items_issued
		});

		await issued.save();
		return res.send(issued);
	}
);

export { router as updateIssuedRouter };
