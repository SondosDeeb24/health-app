//======================================================================================================================
//?  Imports
//======================================================================================================================
import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import  sequelize  from '../DatabaseConnection';


import { appointmentData } from '../interfaces/appointmentInterface';
import {appointment_status} from '../enums/appointmentEnum';

//import User table(model) to create forieng key 
import User from './usersModel';

//==============================================================================================================================================
//? Model class
//==============================================================================================================================================

class Appointment extends  Model<InferAttributes<Appointment>, InferCreationAttributes<Appointment>> implements appointmentData{

    declare appointmentID: string;
    declare patientID: CreationOptional<number>;
    declare doctorID: number;
    declare appointmentDate: Date;
    declare appointmentTime: string;
    declare appointmentStatus: keyof typeof appointment_status;
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
            type: DataTypes.ENUM(...Object.values(appointment_status) as string[]),
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

// I added 'as' because i want to distiguish the user roles from Appointment model side 
Appointment.belongsTo(User, { // appointment belongsTo one patientID (user)
    foreignKey: 'patientID',
    as: 'patient',
    onDelete: 'CASCADE'

});

Appointment.belongsTo(User, {// appointment belongsTo one doctorID (user)
    foreignKey: 'doctorID',
    as: 'doctor',
    onDelete: 'CASCADE'


});


// I added 'as' here incase we wanted to use the associaiton from the User model side 

User.hasMany(Appointment, { // User(patientId) has many appointment
    foreignKey: 'patientID',
    as: 'patientAppointment'
   
});

User.hasMany(Appointment, {// User(doctorID) has many appointment
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

export default Appointment;