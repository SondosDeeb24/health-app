//======================================================================================================================
//?  Imports
//======================================================================================================================
import {Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import  sequelize  from '../DatabaseConnection';

//import interface for the report data
import { reportData } from '../interfaces/reportsInterface';


//import appointments table/model to define the foreing key
import Appointment from './appointmentsModel';
//==============================================================================================================================================
//? Model class
//==============================================================================================================================================

class ReportModel extends Model<InferAttributes<ReportModel> , InferCreationAttributes<ReportModel>> implements reportData {

    declare reportID: string;
    declare appointmentID: string;
    declare diagnosis: string;
    declare description: string;
    declare systolicBloodPressure: number;
    declare diastolicBloodPressure:  number;
    declare bloodSugar: number;
    declare temperature: number;
    declare userWeight: number;
    declare userHeight: number;
    declare medication: string;
    declare additionalComments: string;
    declare reportGenerationDate: Date;
    declare reportGenerationTime: string;
}

//==============================================================================================================================================
//? initiate the tables columns
//==============================================================================================================================================

ReportModel.init({
    reportID:{
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    },appointmentID:{//  FK - appointments table(model) ----------------------
        type: DataTypes.STRING(100),
        allowNull: false,
        references:{
            model: Appointment,
            key: 'appointmentID'
        } //------------------------------------------------------------------
    },diagnosis:{
        type: DataTypes.STRING(450),
        allowNull: false
    }, description:{
        type: DataTypes.STRING(450),
        allowNull: false
    }, systolicBloodPressure:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, diastolicBloodPressure:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, bloodSugar:{
        type: DataTypes.FLOAT,
        allowNull: false
    }, temperature:{
        type: DataTypes.FLOAT,
        allowNull: false
    }, userWeight:{
        type: DataTypes.INTEGER,
        allowNull: false
    },userHeight:{
        type: DataTypes.INTEGER,
        allowNull: false
    }, medication:{
        type: DataTypes.STRING(450),
        allowNull: false
    }, additionalComments:{
        type: DataTypes.STRING(450),
        allowNull: false
    }, reportGenerationDate:{
        type: DataTypes.DATEONLY,
        allowNull: false
    }, reportGenerationTime:{
        type: DataTypes.TIME,
        allowNull: false
    }   
  },
  {
    sequelize, 
    tableName: 'reports',
    timestamps: false
  }
)


//-------------------------
// Define foreing keys
//-------------------------

ReportModel.belongsTo(Appointment, {// Report belongsTo one appointmentID(Appointments)
    foreignKey: 'appointmentID', 
    onDelete: 'CASCADE'
})

Appointment.hasOne(ReportModel , { // appointmentID in report  has one Appointment
    foreignKey: {
        name: 'appointmentID'
    }
})


//==============================================================================================================================================
//? construct the table/model
//==============================================================================================================================================

// try{
//     const buildModel = async () =>{
//         await ReportModel.sync({force: true});
//         console.log('Report Model constructured successfully');
//     }

//     buildModel()
// }catch(error){
//     console.log('Error occured: ', error);
// }

//==============================================================================================================================================
export default ReportModel;
