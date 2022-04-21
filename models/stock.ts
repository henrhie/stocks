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
	declare numberIssued: number;
	declare numberReceived: number;
	declare date: string;
	declare user: string;
}

export { Stock };
