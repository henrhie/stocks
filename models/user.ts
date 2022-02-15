import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelize } from '../index';
import { Password } from '../services/password';

interface UserAttributes {
	name: string;
	username: string;
	password: string;
	access_level: string;
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare username: string;
	declare password: string;
	declare access_level: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER.UNSIGNED,
			autoIncrement: true,
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING,
		},
		username: {
			type: DataTypes.STRING,
		},
		password: {
			type: DataTypes.STRING,
		},
		access_level: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		modelName: 'User',
	}
);

User.beforeCreate(async (user) => {
	const hashed = await Password.toHash(user.password);
	user.password = hashed;
});
export { User };

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
