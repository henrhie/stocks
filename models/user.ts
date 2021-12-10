import mongoose from 'mongoose';

import { Password } from '../services/password';

interface attrType {
	name: string;
	email: string;
	password: string;
}

interface UserModel extends mongoose.Model<UserDocument> {
	build(buildAttr: attrType): UserDocument;
}

interface UserDocument extends mongoose.Document {
	name: string;
	email: string;
	password: string;
}

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
	{
		toJSON: {
			transform(doc, ret) {
				ret.id = ret._id;
				delete ret._id;
				delete ret.password;
				delete ret.__v;
			},
		},
	}
);

userSchema.pre('save', async function (done) {
	if (this.isModified('password')) {
		const hashed = await Password.toHash(this.get('password'));
		this.set('password', hashed);
	}
	done();
});

userSchema.statics.build = (buildAttr: attrType) => {
	return new User(buildAttr);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);

export { User };
