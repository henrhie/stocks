import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelizeInstance } from './sequelizeInstance';
class Remarks extends Model<
	InferAttributes<Remarks>,
	InferCreationAttributes<Remarks>
> {
	declare id: CreationOptional<number>;
	declare remark: string;
}

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
