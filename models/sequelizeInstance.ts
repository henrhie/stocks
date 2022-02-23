import { Sequelize } from 'sequelize';
import { Remarks } from './remarks';
import { DataTypes } from 'sequelize';
import { PowerUsage } from './power-usage';
import { Date as Date_ } from './date';
import { Equipment } from './equipment';
import { User } from './user';
import { Autonomy } from './autonomy';
import { Password } from '../services/password';

const createInstance = async () => {
	const sequelize = new Sequelize({
		database: 'portaldb',
		dialect: 'mssql',
		host: 'ghaprodwebserv2',
		username: 'sa',
		password: 'dbwebADMIN1234',
		dialectModulePath: 'tedious',
		dialectOptions: {
			options: {
				instanceName: 'mssqlserver2',
			},
		},
	});
	try {
		await sequelize.authenticate();
		await sequelize.sync();
		console.log('Connection to db has been established successfully.');
	} catch (error) {
		console.log(error);
	}
	return sequelize;
};

let sequelizeInstance: Sequelize;

(async function () {
	sequelizeInstance = await createInstance();
	Remarks.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			remark: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'Remarks',
		}
	);
	Autonomy.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			autonomy: {
				type: DataTypes.STRING,
			},
			value: {
				type: DataTypes.FLOAT,
			},
			autonomy_rmks: {
				type: DataTypes.STRING,
			},
			date: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'Automony',
		}
	);
	Date_.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			date_artifact: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'Date',
		}
	);
	Equipment.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			equipment_name: {
				type: DataTypes.STRING,
			},
			date: {
				type: DataTypes.STRING,
			},
			current_l1: {
				type: DataTypes.FLOAT,
			},
			current_l2: {
				type: DataTypes.FLOAT,
			},
			current_l3: {
				type: DataTypes.FLOAT,
			},
			power_kw: {
				type: DataTypes.FLOAT,
			},
			power_kva: {
				type: DataTypes.FLOAT,
			},
			utilization: {
				type: DataTypes.FLOAT,
			},
			remark: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			modelName: 'Equipment',
			sequelize: sequelizeInstance,
		}
	);
	PowerUsage.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			facility: {
				type: DataTypes.STRING,
			},
			server_cons: {
				type: DataTypes.FLOAT,
			},
			total_cons: {
				type: DataTypes.FLOAT,
			},
			facility_rmks: {
				type: DataTypes.STRING,
			},
			pue: {
				type: DataTypes.FLOAT,
			},
			date: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
			},
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'PowerUsage',
		}
	);
	User.init(
		{
			id: {
				type: DataTypes.INTEGER,
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
			sequelize: sequelizeInstance,
			freezeTableName: true,
			tableName: 'User',
		}
	);
	await User.sync();
	await PowerUsage.sync();
	await Remarks.sync();
	await Autonomy.sync();
	await Date_.sync();
	await Equipment.sync();

	User.beforeCreate(async (user) => {
		const hashed = await Password.toHash(user.password);
		user.password = hashed;
	});
})();

export { sequelizeInstance };
