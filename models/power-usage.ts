import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelizeInstance } from './sequelizeInstance';
class PowerUsage extends Model<
	InferAttributes<PowerUsage>,
	InferCreationAttributes<PowerUsage>
> {
	declare id: CreationOptional<number>;
	declare facility: string;
	declare date: string;
	declare server_cons: number;
	declare total_cons: number;
	declare facility_rmks: string;
	declare pue: number;
	declare user: string;
}

export { PowerUsage };

// import mongoose = require('mongoose');

// interface attrType {
// 	facility: string;
// 	server_cons: number;
// 	total_cons: number;
// 	facility_rmks: string;
// 	pue: number;
// 	date: string;
// 	user: string;
// }

// interface PowerUsageModel extends mongoose.Model<Partial<PowerUsageDocument>> {
// 	build(buildAttr: attrType): PowerUsageDocument;
// }

// interface PowerUsageDocument extends mongoose.Document {
// 	facility: string;
// 	server_cons: number;
// 	total_cons: number;
// 	facility_rmks: string;
// 	date: string;
// 	pue: number;
// 	user: string;
// }

// const powerUsageSchema = new mongoose.Schema({
// 	facility: String,
// 	server_cons: Number,
// 	total_cons: Number,
// 	facility_rmks: String,
// 	date: String,
// 	pue: Number,
// 	user: String,
// });

// powerUsageSchema.statics.build = (buildAttr: Partial<attrType>) => {
// 	return new PowerUsage(buildAttr);
// };

// const PowerUsage = mongoose.model<Partial<PowerUsageDocument>, PowerUsageModel>(
// 	'PowerUsage',
// 	powerUsageSchema
// );

// export { PowerUsage };
