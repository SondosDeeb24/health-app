"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//========================================================================
//? Importing
//========================================================================
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const sequelize_1 = require("sequelize");
//========================================================================
// create instance of Sequelize
const sequelize = new sequelize_1.Sequelize('hospital_system', 'root', process.env.Database_Password, {
    host: 'localhost', // they are not important , mainly choosed by default like this
    port: 3306,
    dialect: 'mysql'
});
//========================================================================
exports.default = sequelize;
