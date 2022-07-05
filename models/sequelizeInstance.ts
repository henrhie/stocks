import { Sequelize } from 'sequelize';
import { Remarks } from './remarks';
import { DataTypes } from 'sequelize';
import { Issued } from './issued';
import { Date as Date_ } from './date';
import { Stock } from './stock';
import { User } from './user';
import { Received } from './received';
import { Password } from '../services/password';
import { Vendor } from './vendor';

const { DATABASE, HOST, USER, PASSWORD, INSTANCE_NAME } = process.env

const createInstance = async () => {
	const sequelize = new Sequelize({
		database: DATABASE,
		dialect: 'mssql',
		host: HOST,
		username: USER,
		password: PASSWORD,
		dialectOptions: {
			options: {
				instanceName: INSTANCE_NAME,
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
	Issued.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			stockName: {
				type: DataTypes.STRING,
			},
			issuedBy: {
				type: DataTypes.STRING,
			},
			issuedTo: {
				type: DataTypes.STRING,
			},
			date: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
			},
			total: {
				type: DataTypes.INTEGER
			},
			category:  {
				type: DataTypes.STRING
			}
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'Issued',
		},
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
	Received.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			stockName: {
				type: DataTypes.STRING,
			},
			date: {
				type: DataTypes.STRING,
			},
			receivedBy: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			totalNumber: DataTypes.INTEGER,
			vendor: DataTypes.STRING,
			category: DataTypes.STRING
		},
		{
			modelName: 'Received',
			sequelize: sequelizeInstance,
		}
	);
	Stock.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			stockName: {
				type: DataTypes.STRING,
			},
			totalAvailableNumber: {
				type: DataTypes.INTEGER,
			},
			date: {
				type: DataTypes.STRING,
			},
			user: {
				type: DataTypes.STRING,
			},
			serial: {
				type: DataTypes.STRING
			}
		},
		{
			sequelize: sequelizeInstance,
			modelName: 'Stocks',
		}
	);
	Vendor.init({
		id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
		name: DataTypes.STRING
	},
	{
		sequelize: sequelizeInstance,
		modelName: 'Stocks',
	}),
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
	await Issued.sync({ force: true });
	await Remarks.sync();
	await Received.sync({ force: true });
	await Date_.sync();
	await Stock.sync({ force: true});
	await Vendor.sync()

	User.beforeCreate(async (user) => {
		const hashed = await Password.toHash(user.password);
		user.password = hashed;
	});
})();

export { sequelizeInstance };
