import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
class Stock extends Model<
	InferAttributes<Stock>,
	InferCreationAttributes<Stock>
> {
	declare id: CreationOptional<number>;
	declare stockName: string;
	declare totalAvailableNumber: number;
	declare date: string;
	declare user: string;
	declare serial: string;
	declare category: string;
	declare user_group: string;
}

export { Stock };
