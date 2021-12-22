import mongoose = require('mongoose');

interface attrType {
	date_artifact: string;
}

interface DateModel extends mongoose.Model<DateDocument> {
	build(buildAttr: attrType): DateDocument;
}

interface DateDocument extends mongoose.Document {
	date_artifact: string;
}

const DateSchema = new mongoose.Schema({
	date_artifact: String,
});

DateSchema.statics.build = (buildAttr: attrType) => {
	return new Date(buildAttr);
};

const Date = mongoose.model<DateDocument, DateModel>('Date', DateSchema);

export { Date as _Date };
