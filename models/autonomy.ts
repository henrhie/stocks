import mongoose = require('mongoose');

interface attrType {
	autonomyA: string;
	autonomyB: string;
	ups_valueA: number;
	ups_valueB: number;
	autonomy_rmks: string;
	date: string;
}

interface AutonomyModel extends mongoose.Model<AutonomyDocument> {
	build(buildAttr: attrType): AutonomyDocument;
}

interface AutonomyDocument extends mongoose.Document {
	autonomyA: string;
	autonomyB: string;
	ups_valueA: number;
	ups_valueB: number;
	autonomy_rmks: string;
	date: string;
}

const autonomySchema = new mongoose.Schema({
	autonomyA: String,
	autonomyB: String,
	ups_valueA: Number,
	ups_valueB: Number,
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
