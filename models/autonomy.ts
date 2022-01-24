import mongoose = require('mongoose');

interface attrType {
	autonomy: string;
	value: number;
	autonomy_rmks: string;
	date: string;
}

interface AutonomyModel extends mongoose.Model<AutonomyDocument> {
	build(buildAttr: attrType): AutonomyDocument;
}

interface AutonomyDocument extends mongoose.Document {
	autonomy: string;
	value: number;
	autonomy_rmks: string;
	date: string;
}

const autonomySchema = new mongoose.Schema({
	autonomy: String,
	value: Number,
	autonomy_rmks: String,
	date: String,
});

autonomySchema.statics.build = (buildAttr: attrType) => {
	return new Autonomy(buildAttr);
};

const Autonomy = mongoose.model<Partial<AutonomyDocument>, AutonomyModel>(
	'Autonomy',
	autonomySchema
);

export { Autonomy };
