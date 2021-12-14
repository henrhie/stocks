import mongoose from 'mongoose';

interface attrType {
	name: string;
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
	name: string;
	current_l1?: number;
	current_l2?: number;
	current_l3?: number;
	power_kw?: number;
	power_kva?: number;
	utilization?: number;
	remark?: string;
}

const equipmentSchema = new mongoose.Schema({
	name: { type: String, required: true },
	current_l1: Number,
	current_l2: Number,
	current_l3: Number,
	power_kw: Number,
	power_kva: Number,
	utilization: Number,
	remark: String,
});

equipmentSchema.statics.build = (buildAttr: attrType) => {
	return new Equipment(buildAttr);
};

const Equipment = mongoose.model<EquipmentDocument, EquipmentModel>(
	'Equipment',
	equipmentSchema
);

export { Equipment };