//======================================================================================================================
//?  Imports
//======================================================================================================================
import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import  sequelize  from '../DatabaseConnection';


import { appointmentData } from '../interfaces/appointmentInterface';
import {status} from '../enums/appointmentEnum';

//import User table(model) to create forieng key 
import User from './usersModel';

//==============================================================================================================================================
//? Model class
//==============================================================================================================================================

class Appointment extends  Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> implements appointmentData{

    declare appointmentID: string;
    declare patientID: number;
    declare doctorID: number;
    declare appointmentDate: Date;
    declare appointmentTime: string;
    declare appointmentStatus: keyof typeof status;
}


//==============================================================================================================================================
//? Intital appointments table 
//==============================================================================================================================================

Appointment.init({
        appointmentID:{
            type: DataTypes.STRING(50),
            primaryKey: true,
            allowNull: false
        },patientID:{//  FK - users table(model) ----------------------
            type: DataTypes.INTEGER,
            allowNull: true, 
            references:{
                model: 'users',
                key: 'userID'
            }
        }, doctorID:{//  FK - usrs table(model) ----------------------
            type: DataTypes.INTEGER, 
            allowNull: false, 
            references:{
                model: 'users',
                key: 'userID'
            }// -------------------------------------------------------
        }, appointmentDate:{
            type: DataTypes.DATEONLY,
            allowNull: false
        }, appointmentTime:{
            type: DataTypes.TIME,
            allowNull: false
        }, appointmentStatus:{
            type: DataTypes.ENUM(...Object.values(status) as string[]),
            allowNull: false
        }
    },
    {
    sequelize,// to attach the User model to the database connection i've defined in databaseConnection.ts
    tableName: 'appointments',
    timestamps: false, // it creates createdAt / updatedAt columns
    }
);

//-------------------------------------------------------------------------------------------------------------------------------------
//?define the foreign keys relation (Association)
//-------------------------------------------------------------------------------------------------------------------------------------

Appointment.belongsTo(User, { // appointment belongsTo one patientID (user)
    foreignKey: 'patientID',
    onDelete: 'CASCADE'

});

Appointment.belongsTo(User, {// appointment belongsTo one doctorID (user)
    foreignKey: 'doctorID',
    onDelete: 'CASCADE'


});

User.hasMany(Appointment, { // User(patientId) has many appointment
    foreignKey: 'patientID'
   
});

User.hasMany(Appointment, {// User(doctorID) has many appointment
    foreignKey: 'doctorID'
    
});


//====================================================================================================================
//!!
// const start = async () => {
//     await sequelize.sync({ force: true }); 
//     console.log(' Database synced!');
// };

//start(); // call the function
//====================================================================================================================

export default Appointment;