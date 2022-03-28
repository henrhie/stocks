"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
}
exports.User = User;
// import mongoose = require('mongoose');
// import { Password } from '../services/password';
// interface attrType {
// 	name: string;
// 	username: string;
// 	password: string;
// 	access_level: string;
// }
// interface UserModel extends mongoose.Model<UserDocument> {
// 	build(buildAttr: attrType): UserDocument;
// }
// interface UserDocument extends mongoose.Document {
// 	name: string;
// 	username: string;
// 	password: string;
// 	access_level: string;
// }
// const userSchema = new mongoose.Schema(
// 	{
// 		name: {
// 			type: String,
// 			required: true,
// 		},
// 		username: {
// 			type: String,
// 			required: true,
// 		},
// 		password: {
// 			type: String,
// 			required: true,
// 		},
// 		access_level: {
// 			type: String,
// 			required: true,
// 		},
// 	},
// 	{
// 		toJSON: {
// 			transform(doc, ret) {
// 				ret.id = ret._id;
// 				delete ret._id;
// 				delete ret.password;
// 				delete ret.__v;
// 			},
// 		},
// 	}
// );
// userSchema.pre('save', async function (done) {
// 	if (this.isModified('password')) {
// 		const hashed = await Password.toHash(this.get('password'));
// 		this.set('password', hashed);
// 	}
// 	done();
// });
// userSchema.statics.build = (buildAttr: attrType) => {
// 	return new User(buildAttr);
// };
// const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
// export { User };
