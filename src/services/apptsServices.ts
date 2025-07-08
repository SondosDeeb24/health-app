//===========================================================================================================
//? Import 
//==========================================================================================================
import { Request, Response } from 'express';

//import enum for the valid apponitment status
import { ApptStatus } from '../enums/appointmentEnum';

//importing interfaces:
import { define_available_appointments, DataToViewAvailableAppts, DataToBookAppt} from '../interfaces/appointmentInterface';

// import uuid (Universally Unique Identifier)
import {v4 as uuidv4} from 'uuid';

//import helper to get the user data from the token
import { extractJWTData } from '../helpers/extractJWTData';

//import Models 
import Appointment from '../models/appointmentsModel';
import User from '../models/usersModel';


//===========================================================================================================

class ApptServices{

    //?============================================================================================================================================================
    //? define_available_appointment
    // function that allow doctors to sit available appointments. so users can book from them
    //============================================================================================================================================================
    async defineAvailableAppointments(req: Request, res: Response): Promise<void>{
        try{
        //get the values from the user ---------------------------------------------------------------------------------------------
        const body:  define_available_appointments = req.body;

        let{
            appointment_date,
            appointment_time
        } = body;

        if ( !appointment_date || !appointment_time ){
            console.log('Fill all required fields to create appointment');
            res.status(400).json({message: 'Fill all required fields to create appointment'});
            return ;
        }
        

        const doctor_id = extractJWTData(req, res);
        if(!doctor_id){ //if no tokent data found stop the operation. (json response is send from extract_token_data function)
            return;
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //check if a available appointment was alreayd added to that doctor at the same time for the specified date

        const appointmentExists = await Appointment.findOne({
            where:{
                doctorID: doctor_id.user_id,
                appointmentDate: new Date(appointment_date),
                appointmentTime: appointment_time
            },
            raw: true // to get JS object rather thatn model instance
        })  
        if(appointmentExists){
            console.log("Appointment is already added!");
            res.status(208).json({message: "Appointment is already added!"}); //208 status is already reported
            return;
        }

        // construct appointment_id ---------------------------------------------------------------------------------------------------------------------
        // i'm using Universally Unique Identifires ( a 128-bit data object)
        let appointment_id = uuidv4();

        // insert the data into the database --------------------------------------------------------------------------------------------------------------------

        const addAppointment= await Appointment.create({// if executed successfully it returns model instance, otherwise it raise an error
            appointmentID: appointment_id,
            doctorID: doctor_id.user_id, 
            appointmentDate: new Date(appointment_date), // convert the string to date (becuase appointmentDate is expecting date datatype)
            appointmentTime: appointment_time,
            appointmentStatus: ApptStatus.available
        })

        console.log("Available Appointment was successfully defined.");
        res.status(201).json({message: "Available Appointment was successfully defined."});
        return;

    //===========================================================================================================    
        }catch(error){
            console.log(`Error while defining appointment. ${error}`);
            res.status(400).json({message: `Error while defining appointment. ${error}`});
            return;
        }
    }

    //?============================================================================================================================================================
    //? view_appointments
    // function that provider users(patients) to view available appointment
    //============================================================================================================================================================
    async viewAppointments(req: Request, res: Response): Promise<void>{
        try{

        // take data from the patient --------------------------------------------------------------------------------------------------
        const body: DataToViewAvailableAppts = req.body;

        const {
            department,
            appointment_date,
            doctor_id
        } = body;

        if( !department || !appointment_date ){
            console.log('Fill all required fields');
            res.status(400).json({message: 'Fill all required fields'});
            return;
        }
        // --------------------------------------------------------------------------------------------------
        //declare array to store available appointments 
        let appointments_found = [];
        // let appointments_found: appointment_data[]  = [];
        

        if(!doctor_id){ // if no docotr specificed , get all the doctors from specific department in spcific date
            appointments_found =  await Appointment.findAll({
                where: {
                    appointmentStatus: 'available',
                    appointmentDate: appointment_date
                },
                include:[{
                    model: User,
                    as: 'doctor',//!
                    where:{
                        userDepartment: department
                    },
                    attributes: [ 'userName', 'userGender']
                }
                ],
                attributes: ['appointmentTime'],
                raw: true
            })
        }else{// when a specific doctor is choosed, get only his available appointments in spcific date
            appointments_found =  await Appointment.findAll({
                where: {
                    appointmentStatus: 'available',
                    appointmentDate: appointment_date
                },
                include:[{
                    model: User,
                    as: 'doctor',//!
                    where:{
                        userDepartment: department,
                        userID: doctor_id
                    }, 
                    attributes:[] // no need to view any data about the doctor , since the patient choosed the doctor
                }
                ],
                attributes: ['appointmentTime'],
                raw: true
            })
    
        }


        if(appointments_found.length == 0){
            console.log('No Available appointments Found');
            res.status(200).json({message: 'No Available appointments Found'});
            return;
        }
        // --------------------------------------------------------------------------------------------------

        console.log(appointments_found);
        res.status(200).json(appointments_found);
        return ;

        //===========================================================================================================
        }catch(error){
            console.log(`Error Occured while fetching available appointments. Error: ${error}`);
            res.status(400).json({message:`Error Occured while fetching available appointments. Error: ${error}` });
        }

    }

    //?============================================================================================================================================================
    //? view Booked Appointments
    // function used for fetch all booked appointments and show them to the doctor
    //============================================================================================================================================================

    async viewBookedAppointments(req: Request, res: Response): Promise<void>{
        try{

        //----------------------------------------------------------------------
        // get the doctor data from the token 
        const user_data = extractJWTData(req, res);
        if(!user_data ){ // when NO user_data found, we get null. in this case we have to stop the function ( no need to send response because  error message was already sent from extract_token_data function)
            return;
        }

        //----------------------------------------------------------------------
        // fetch all booked appointment for the doctor

        const bookedAppointments = await Appointment.findAll({
            where:{
                appointmentStatus: 'booked',
                doctorID: user_data.user_id
            },
            include:[{ // used JOIN to get the userNames for the patients that have appointments with that doctor
                model: User,
                as: 'patient',
                attributes: ['userName']
            }],
            attributes: ['appointmentDate', 'appointmentTime']
        });

        if(bookedAppointments.length === 0){
            console.log('you have no appointments');
            res.status(200).json({message: 'you have no appointments'});
            return;
        }
        //----------------------------------------------------------------------
        // if appointments found, display them to the doctor 

        console.log(bookedAppointments);
        res.status(200).json(bookedAppointments);
        return ;

    //===========================================================================================================
        }catch(error){
            console.error(`Error Occured while fetching the appointments. Error: ${error}`);
            res.status(400).json({message:`Error Occured while fetching the appointments. Error: ${error}` });
        }
    } 
    //?============================================================================================================================================================
    //? users book appointments
    // function that allow users to book appointments
    //============================================================================================================================================================

    async bookAppointment(req: Request, res: Response):Promise<void>{
        try{
            const body: DataToBookAppt = req.body;

            const{
                apptID
            } = body;
            const patientData = extractJWTData(req, res);
            if(!patientData){// error message will be sent from extractJWTData()
                return;
            }

            //confirm all required data provided
            if(!apptID){
                console.error('No appointment id was provided!');
                res.status(400).json({message: 'No appointment id was provided!'});
                return ;
            }

            //validate appointment exists and status is available 
            const chosenAppt = await Appointment.findOne({
                where:{
                    appointmentID: apptID,
                    appointmentStatus: ApptStatus.available
                }
            });

            if(!chosenAppt){
                console.error('No appointment found for the provided data, please pick another appointment');
                res.status(404).json({message: 'No appointment found for the provided data, please pick another appointment'});
                return ;
            }

            // when chosenAppt exists, then we update the data of that record (book the appointment)
            const [updateApptData]= await Appointment.update({
                patientID: patientData.user_id, 
                appointmentStatus: ApptStatus.booked 
            },
            {
                where:{
                appointmentID: apptID
                }
            })


            //print error message if row was not updatted
            if(updateApptData === 0){
                console.error('Error Occured, appointment was not booked');
                res.status(500).json({message: 'Error Occured, appointment was not booked'});
                return ;
            }
            
            console.log('Appointment was successfully booked');
            res.status(200).json({message: 'Appointment was successfully booked'});
            return;

        //====================================================================================================================
        }catch(error){
            console.error('Error while occured while booking appointment', error);
            res.status(500).json({message: 'Error while occured while booking appointment', error});
            return ;
        }
    }
}

//==========================================================================================================

export {ApptServices};