"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//======================================================================================================================
//?  Imports
//======================================================================================================================
const sequelize_1 = require("sequelize");
const DatabaseConnection_1 = __importDefault(require("../DatabaseConnection"));
//import appointments table/model to define the foreing key
const appointmentsModel_1 = __importDefault(require("./appointmentsModel"));
//==============================================================================================================================================
//? Model class
//==============================================================================================================================================
class Report extends sequelize_1.Model {
}
//==============================================================================================================================================
//? initiate the tables columns
//==============================================================================================================================================
Report.init({
    reportID: {
        type: sequelize_1.DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    }, appointmentID: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        references: {
            model: appointmentsModel_1.default,
            key: 'appointmentID'
        } //------------------------------------------------------------------
    }, diagnosis: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: false
    }, description: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: false
    }, bloodPressure: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }, bloodSugar: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false
    }, temperature: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    }, userWeight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }, userHeight: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }, medication: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: false
    }, additionalComments: {
        type: sequelize_1.DataTypes.STRING(450),
        allowNull: false
    }, reportGenerationDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }, reportGenerationTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }
}, {
    sequelize: DatabaseConnection_1.default,
    tableName: 'reports',
    timestamps: false
});
//-------------------------
// Define foreing keys
//-------------------------
Report.belongsTo(appointmentsModel_1.default, {
    foreignKey: 'appointmentID',
    onDelete: 'CASCADE'
});
appointmentsModel_1.default.hasOne(Report, {
    foreignKey: {
        name: 'appointmentID'
    }
});
//==============================================================================================================================================
//? construct the table/model
//==============================================================================================================================================
//!
// try{
//     const buildModel = async () =>{
//         await sequelize.sync({force: true});
//         console.log('Report Model constructured successfully');
//     }
//     buildModel()
// }catch(error){
//     console.log('Error occured: ', error);
// }
//==============================================================================================================================================
exports.default = Report;
