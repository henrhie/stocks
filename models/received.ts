import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
class Received extends Model<
	InferAttributes<Received>,
	InferCreationAttributes<Received>
> {
	declare id: CreationOptional<number>;
	declare stockName: string;
	declare receivedBy: string;
	declare date: string;
	declare user: string;
	declare totalNumber: number;
	declare vendor: string;
	declare category: string;
}

export { Received };

// import mongoose = require('mongoose');

// interface attrType {
// 	autonomy: string;
// 	value: number;
// 	autonomy_rmks: string;
// 	date: string;
// 	user: string;
// }

// interface AutonomyModel extends mongoose.Model<AutonomyDocument> {
// 	build(buildAttr: attrType): AutonomyDocument;
// }

// interface AutonomyDocument extends mongoose.Document {
// 	autonomy: string;
// 	value: number;
// 	autonomy_rmks: string;
// 	date: string;
// 	user: string;
// }

// const autonomySchema = new mongoose.Schema({
// 	autonomy: String,
// 	value: Number,
// 	autonomy_rmks: String,
// 	date: String,
// 	user: String,
// });

// autonomySchema.statics.build = (buildAttr: attrType) => {
// 	return new Autonomy(buildAttr);
// };

// const Autonomy = mongoose.model<Partial<AutonomyDocument>, AutonomyModel>(
// 	'Autonomy',
// 	autonomySchema
// );

// export { Autonomy };
