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
}

export { Vendor };