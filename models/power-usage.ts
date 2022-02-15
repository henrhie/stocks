import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelize } from '../index';
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

PowerUsage.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		facility: {
			type: DataTypes.STRING,
		},
		server_cons: {
			type: DataTypes.NUMBER,
		},
		total_cons: {
			type: DataTypes.NUMBER,
		},
		facility_rmks: {
			type: DataTypes.STRING,
		},
		pue: {
			type: DataTypes.NUMBER,
		},
		date: {
			type: DataTypes.STRING,
		},
		user: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'PowerUsage',
	}
);

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
