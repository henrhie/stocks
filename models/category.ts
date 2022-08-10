import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
class Category extends Model<
	InferAttributes<Category>,
	InferCreationAttributes<Category>
> {
	declare id: CreationOptional<number>;
	declare cat_name: string;
	declare user: string;
	declare user_group: string;
}

export { Category };
