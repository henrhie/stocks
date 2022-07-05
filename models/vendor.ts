import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
class Vendor extends Model<
	InferAttributes<Vendor>,
	InferCreationAttributes<Vendor>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare products: string;
	declare email: string;
	declare contact: string;
	declare user: string;
}

export { Vendor };