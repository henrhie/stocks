import mongoose = require('mongoose');

interface attrType {
	equipment_name: string;
	date: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

interface EquipmentModel extends mongoose.Model<EquipmentDocument> {
	build(buildAttr: attrType): EquipmentDocument;
}

interface EquipmentDocument extends mongoose.Document {
	equipment_name: string;
	date: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

const equipmentSchema = new mongoose.Schema({
	// author: {
	// 	type: String,
	// 	required: true,
	// },
	equipment_name: {
		type: String,
		// required: true,
	},
	date: {
		type: String,
		// required: true,
	},
	current_l1: {
		type: Number,
	},
	current_l2: {
		type: Number,
	},
	current_l3: {
		type: Number,
	},
	power_kw: {
		type: Number,
	},
	power_kva: {
		type: Number,
	},
	utilization: {
		type: Number,
	},
	remark: {
		type: String,
	},
});

equipmentSchema.statics.build = (buildAttr: attrType) => {
	return new Equipment(buildAttr);
};

const Equipment = mongoose.model<EquipmentDocument, EquipmentModel>(
	'Equipment',
	equipmentSchema
);

export { Equipment };
