import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelize } from '../index';
class Remarks extends Model<
	InferAttributes<Remarks>,
	InferCreationAttributes<Remarks>
> {
	declare id: CreationOptional<number>;
	declare remark: string;
}

Remarks.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		remark: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'Remarks',
	}
);

export { Remarks };

// import mongoose = require('mongoose');

// interface attrType {
// 	remark: string;
// }

// interface RemarkModel extends mongoose.Model<RemarkDocument> {
// 	build(buildAttr: attrType): RemarkDocument;
// }

// interface RemarkDocument extends mongoose.Document {
// 	remark: string;
// }

// const RemarkSchema = new mongoose.Schema({
// 	remark: String,
// });

// RemarkSchema.statics.build = (buildAttr: attrType) => {
// 	return new Remarks(buildAttr);
// };

// const Remarks = mongoose.model<RemarkDocument, RemarkModel>(
// 	'Remarks',
// 	RemarkSchema
// );

// export { Remarks };
