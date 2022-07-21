import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
} from 'sequelize';
class Activity extends Model<
	InferAttributes<Activity>,
	InferCreationAttributes<Activity>
> {
	declare id: CreationOptional<number>;
	declare username: string;
	declare item: string;
	declare date: string;
	declare time: string;
	declare activity: string;
	declare number?: number;
}

export { Activity };
