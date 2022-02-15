import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelize } from '../index';
class Autonomy extends Model<
	InferAttributes<Autonomy>,
	InferCreationAttributes<Autonomy>
> {
	declare id: CreationOptional<number>;
	declare autonomy: string;
	declare value: number;
	declare autonomy_rmks: string;
	declare date: string;
	declare user: string;
}

Autonomy.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		autonomy: {
			type: DataTypes.STRING,
		},
		value: {
			type: DataTypes.NUMBER,
		},
		autonomy_rmks: {
			type: DataTypes.STRING,
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
		modelName: 'Automony',
	}
);

export { Autonomy };

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
