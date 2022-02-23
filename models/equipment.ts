import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelizeInstance } from './sequelizeInstance';
class Equipment extends Model<
	InferAttributes<Equipment>,
	InferCreationAttributes<Equipment>
> {
	declare id: CreationOptional<number>;
	declare equipment_name: string;
	declare date: string;
	declare current_l1: number;
	declare current_l2: number;
	declare current_l3: number;
	declare power_kw: number;
	declare power_kva: number;
	declare utilization: number;
	declare remark: string;
	declare user: string;
}

export { Equipment };

// import mongoose = require('mongoose');

// interface attrType {
// 	equipment_name: string;
// 	date: string;
// 	current_l1?: number;
// 	current_l2?: number;
// 	current_l3?: number;
// 	power_kw?: number;
// 	power_kva?: number;
// 	utilization?: number;
// 	remark?: string;
// 	user?: string;
// }

// interface EquipmentModel extends mongoose.Model<EquipmentDocument> {
// 	build(buildAttr: attrType): EquipmentDocument;
// }

// interface EquipmentDocument extends mongoose.Document {
// 	equipment_name: string;
// 	date: string;
// 	current_l1?: number;
// 	current_l2?: number;
// 	current_l3?: number;
// 	power_kw?: number;
// 	power_kva?: number;
// 	utilization?: number;
// 	remark?: string;
// 	user?: string;
// }

// const equipmentSchema = new mongoose.Schema({
// 	// author: {
// 	// 	type: String,
// 	// 	required: true,
// 	// },
// 	equipment_name: {
// 		type: String,
// 		// required: true,
// 	},
// 	date: {
// 		type: String,
// 		// required: true,
// 	},
// 	current_l1: {
// 		type: Number,
// 	},
// 	current_l2: {
// 		type: Number,
// 	},
// 	current_l3: {
// 		type: Number,
// 	},
// 	power_kw: {
// 		type: Number,
// 	},
// 	power_kva: {
// 		type: Number,
// 	},
// 	utilization: {
// 		type: Number,
// 	},
// 	remark: {
// 		type: String,
// 	},
// 	user: String,
// });

// equipmentSchema.statics.build = (buildAttr: attrType) => {
// 	return new Equipment(buildAttr);
// };

// const Equipment = mongoose.model<EquipmentDocument, EquipmentModel>(
// 	'Equipment',
// 	equipmentSchema
// );

// export { Equipment };
