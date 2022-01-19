import mongoose = require('mongoose');

interface attrType {
	facility: string;
	server_cons: number;
	total_cons: number;
	facility_rmks: string;
	date: string;
}

interface PowerUsageModel extends mongoose.Model<Partial<PowerUsageDocument>> {
	build(buildAttr: attrType): PowerUsageDocument;
}

interface PowerUsageDocument extends mongoose.Document {
	facility: string;
	server_cons: number;
	total_cons: number;
	facility_rmks: string;
	date: string;
}

const powerUsageSchema = new mongoose.Schema({
	facility: String,
	server_cons: Number,
	total_cons: Number,
	facility_rmks: String,
	date: String,
});

powerUsageSchema.statics.build = (buildAttr: Partial<attrType>) => {
	return new PowerUsage(buildAttr);
};

const PowerUsage = mongoose.model<Partial<PowerUsageDocument>, PowerUsageModel>(
	'PowerUsage',
	powerUsageSchema
);

export { PowerUsage };
