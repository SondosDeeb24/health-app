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
const appointmentEnum_1 = require("../enums/appointmentEnum");
//import User table(model) to create forieng key 
const usersModel_1 = __importDefault(require("./usersModel"));
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
        allowNull: true,
        references: {
            model: 'users',
            key: 'userID'
        }
    }, doctorID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'userID'
        } // -------------------------------------------------------
    }, appointmentDate: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false
    }, appointmentTime: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    }, appointmentStatus: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(appointmentEnum_1.ApptStatus)),
        allowNull: false
    }
}, {
    sequelize: DatabaseConnection_1.default, // to attach the User model to the database connection i've defined in databaseConnection.ts
    tableName: 'appointments',
    timestamps: false, // it creates createdAt / updatedAt columns
});
//-------------------------------------------------------------------------------------------------------------------------------------
//?define the foreign keys relation (Association)
//-------------------------------------------------------------------------------------------------------------------------------------
// I added 'as' because i want to distiguish the user roles from Appointment model side 
Appointment.belongsTo(usersModel_1.default, {
    foreignKey: 'patientID',
    as: 'patient',
    onDelete: 'CASCADE'
});
Appointment.belongsTo(usersModel_1.default, {
    foreignKey: 'doctorID',
    as: 'doctor',
    onDelete: 'CASCADE'
});
// I added 'as' here incase we wanted to use the associaiton from the User model side 
usersModel_1.default.hasMany(Appointment, {
    foreignKey: 'patientID',
    as: 'patientAppointment'
});
usersModel_1.default.hasMany(Appointment, {
    foreignKey: 'doctorID',
    as: 'doctorAppointment'
});
//====================================================================================================================
//!!
// const start = async () => {
//     await sequelize.sync({ force: true }); 
//     console.log(' Database synced!');
// };
//start(); // call the function
//====================================================================================================================
exports.default = Appointment;
