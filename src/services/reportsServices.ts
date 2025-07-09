//===========================================================================================================
//? Import 
//==========================================================================================================
import { Request, Response } from 'express';

//import infterface
import { reportData } from '../interfaces/reportsInterface';

//import helper function to extract data from JWT
import { extractJWTData } from '../helpers/extractJWTData';

// import uuid (Universally Unique Identifier)
import {v4 as uuidv4} from 'uuid';


//import Report model(table)
import ReportModel from '../models/reportsModel';
import Appointment from '../models/appointmentsModel';
//==========================================================================================================

export class ReportsServices{

    //?==========================================================================================================
    //? functio to create reports 
    //==========================================================================================================

    async createReport(req:Request, res: Response): Promise<void>{
        try{
            const body: reportData = req.body;

            const {
                appointmentID, 
                diagnosis,
                description,
                systolicBloodPressure,
                diastolicBloodPressure,
                bloodSugar,
                temperature,
                userWeight,
                userHeight, 
                medication,
                additionalComments
            } = body;

            if(!appointmentID || !diagnosis || !description || !systolicBloodPressure  || !diastolicBloodPressure  || !bloodSugar || !temperature || !userWeight || !userHeight || !medication){
                console.error('Fill all required fields');
                res.status(500).json({message: 'Fill all required fields'});
                return;
            };

            //----------------------------------------------------------------------------------------------------------------------
            //check if a report already stored for this appointment
            const reportExists = await ReportModel.findOne({
                where: {
                    appointmentID: appointmentID
                }
            })

            if(reportExists){
                console.log('Report Exists for this appointment');
                res.status(422).json({message: 'Report Exists for this appointment'});
                return;
            }
            //----------------------------------------------------------------------------------------------------------------------
            //enusure the doctor is Authorized (he's creating report for his appointment)

            const userData= extractJWTData(req, res);
            if(!userData){// error message is sent from extractJWTData function
                return ;
            }

            //check that the appointment doctor is the same doctor trying to create the appointments
            const authorizeDoctor = await Appointment.findOne({
                where: {
                    appointmentID: appointmentID, 
                    doctorID: userData?.user_id
                }
            })

            if(!authorizeDoctor){
                console.log('you are not authorized to create Report for this appointment');
                res.status(401).json({message: 'you are not authorized to create Report for this appointment'});
                return;
            }

            //----------------------------------------------------------------------------------------------------------------------
            //create reportID
            const reportID = uuidv4();

            //----------------------------------------------------------------------------------------------------------------------
            //insert report in Reports Table
            const addedReport = await ReportModel.create({
                appointmentID: appointmentID, 
                reportID: reportID,
                diagnosis: diagnosis,
                description: description,
                systolicBloodPressure: systolicBloodPressure,
                diastolicBloodPressure: diastolicBloodPressure,
                bloodSugar: bloodSugar,
                temperature: temperature,
                userWeight: userWeight,
                userHeight: userHeight, 
                medication: medication,
                additionalComments: additionalComments || "", // use space string if no comments was provoided
                reportGenerationDate: new Date( new Date().toDateString() ),
                reportGenerationTime: new Date().toTimeString().split(' ')[0]
            })
        
            console.log('report was successfully stored');
            res.status(200).json({message:'report was successfully stored'});
            return ;
        //==========================================================================================================    
        }catch(error){
            console.error('Error occured while creating report', error)
            res.status(500).json({message: 'Error occured while creating report', error})
            return;
        }
    }
}