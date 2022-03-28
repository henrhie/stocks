"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelizeInstance = void 0;
const sequelize_1 = require("sequelize");
const remarks_1 = require("./remarks");
const sequelize_2 = require("sequelize");
const power_usage_1 = require("./power-usage");
const date_1 = require("./date");
const equipment_1 = require("./equipment");
const user_1 = require("./user");
const autonomy_1 = require("./autonomy");
const password_1 = require("../services/password");
const { DATABASE, HOST, USER, PASSWORD, INSTANCE_NAME } = process.env;
const createInstance = () => __awaiter(void 0, void 0, void 0, function* () {
    const sequelize = new sequelize_1.Sequelize({
        database: DATABASE,
        dialect: 'mssql',
        host: HOST,
        username: USER,
        password: PASSWORD,
        dialectModulePath: 'tedious',
        dialectOptions: {
            options: {
                instanceName: INSTANCE_NAME,
            },
        },
    });
    try {
        yield sequelize.authenticate();
        yield sequelize.sync();
        console.log('Connection to db has been established successfully.');
    }
    catch (error) {
        console.log(error);
    }
    return sequelize;
});
let sequelizeInstance;
exports.sequelizeInstance = sequelizeInstance;
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        exports.sequelizeInstance = sequelizeInstance = yield createInstance();
        remarks_1.Remarks.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            remark: {
                type: sequelize_2.DataTypes.STRING,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Remarks',
        });
        autonomy_1.Autonomy.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            autonomy: {
                type: sequelize_2.DataTypes.STRING,
            },
            value: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            autonomy_rmks: {
                type: sequelize_2.DataTypes.STRING,
            },
            date: {
                type: sequelize_2.DataTypes.STRING,
            },
            user: {
                type: sequelize_2.DataTypes.STRING,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Automony',
        });
        date_1.Date.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            date_artifact: {
                type: sequelize_2.DataTypes.STRING,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'Date',
        });
        equipment_1.Equipment.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            equipment_name: {
                type: sequelize_2.DataTypes.STRING,
            },
            date: {
                type: sequelize_2.DataTypes.STRING,
            },
            current_l1: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            current_l2: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            current_l3: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            power_kw: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            power_kva: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            utilization: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            remark: {
                type: sequelize_2.DataTypes.STRING,
            },
            user: {
                type: sequelize_2.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            modelName: 'Equipment',
            sequelize: sequelizeInstance,
        });
        power_usage_1.PowerUsage.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            facility: {
                type: sequelize_2.DataTypes.STRING,
            },
            server_cons: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            total_cons: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            facility_rmks: {
                type: sequelize_2.DataTypes.STRING,
            },
            pue: {
                type: sequelize_2.DataTypes.FLOAT,
            },
            date: {
                type: sequelize_2.DataTypes.STRING,
            },
            user: {
                type: sequelize_2.DataTypes.STRING,
            },
        }, {
            sequelize: sequelizeInstance,
            modelName: 'PowerUsage',
        });
        user_1.User.init({
            id: {
                type: sequelize_2.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: sequelize_2.DataTypes.STRING,
            },
            username: {
                type: sequelize_2.DataTypes.STRING,
            },
            password: {
                type: sequelize_2.DataTypes.STRING,
            },
            access_level: {
                type: sequelize_2.DataTypes.STRING,
            },
        }, {
            sequelize: sequelizeInstance,
            freezeTableName: true,
            tableName: 'User',
        });
        yield user_1.User.sync();
        yield power_usage_1.PowerUsage.sync();
        yield remarks_1.Remarks.sync();
        yield autonomy_1.Autonomy.sync();
        yield date_1.Date.sync();
        yield equipment_1.Equipment.sync();
        user_1.User.beforeCreate((user) => __awaiter(this, void 0, void 0, function* () {
            const hashed = yield password_1.Password.toHash(user.password);
            user.password = hashed;
        }));
    });
})();
