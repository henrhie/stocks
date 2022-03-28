"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Remarks = void 0;
const sequelize_1 = require("sequelize");
class Remarks extends sequelize_1.Model {
}
exports.Remarks = Remarks;
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
