import {
	DataTypes,
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
import { sequelizeInstance } from './sequelizeInstance';
class Equipment extends Model<
	InferAttributes<Equipment>,
	InferCreationAttributes<Equipment>
> {
	declare id: CreationOptional<number>;
	declare equipment_name: string;
	declare date: string;
	declare current_l1: number;
	declare current_l2: number;
	declare current_l3: number;
	declare power_kw: number;
	declare power_kva: number;
	declare utilization: number;
	declare remark: string;
	declare user: string;
}

export { Equipment };
