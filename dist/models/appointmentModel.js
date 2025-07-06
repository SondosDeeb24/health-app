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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//======================================================================================================================
//?  Imports
//======================================================================================================================
const sequelize_1 = require("sequelize");
const DatabaseConnection_1 = __importDefault(require("../DatabaseConnection"));
const appointmentEnum_1 = require("../enums/appointmentEnum");
//import User table(model) to create forieng key 
const userModel_1 = __importDefault(require("./userModel"));
//==============================================================================================================================================
//? Model class
//==============================================================================================================================================
class Appointment extends sequelize_1.Model {
}
//==============================================================================================================================================
//? Intital appointments table 
//==============================================================================================================================================
Appointment.init({
    appointmentID: {
        type: sequelize_1.DataTypes.STRING(50),
        primaryKey: true,
        allowNull: false
    }, patientID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    }, doctorID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    }, appointmentDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }, appointmentTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }, appointmentStatus: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(appointmentEnum_1.status)),
        allowNull: false
    }
}, {
    sequelize: DatabaseConnection_1.default, // to attach the User model to the database connection i've defined in databaseConnection.ts
    tableName: 'appointments',
    timestamps: false, // it creates createdAt / updatedAt columns
});
//-------------------------------------------------------------------------------------------------------------------------------------
//define the foreign keys relation (Association)
userModel_1.default.hasMany(Appointment, {
    foreignKey: 'patientID',
    as: 'patientAppointments'
});
userModel_1.default.hasMany(Appointment, {
    foreignKey: 'doctorID',
    as: 'doctorAppointments'
});
Appointment.belongsTo(userModel_1.default, {
    foreignKey: 'patientID',
    as: 'patient'
});
Appointment.belongsTo(userModel_1.default, {
    foreignKey: 'doctorID',
    as: 'doctor'
});
//====================================================================================================================
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield DatabaseConnection_1.default.sync({ alter: true });
    console.log(' Database synced!');
});
start(); // call the function
