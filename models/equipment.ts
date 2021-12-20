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
	equipment_name: {
		type: String,
		required: true,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	date: {
		type: String,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	current_l1: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	current_l2: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	current_l3: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	power_kw: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	power_kva: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	utilization: {
		type: Number,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
	},
	remark: {
		type: String,
		set: function omitEmptyString(v: any) {
			if (
				this instanceof mongoose.Query /* only run on queries */ &&
				v === ''
			) {
				return undefined;
			}
			return v;
		},
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
