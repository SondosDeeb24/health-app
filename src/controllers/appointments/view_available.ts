//===========================================================================================================
//? Import 
//===========================================================================================================

import database from '../../database_connection';
import { Request, Response } from 'express';

//import interfaces 
import {appointment_data} from '../../interfaces/common_view_appointment';
import { patient_make_appointment } from '../../interfaces/view_available_appointments';



//===========================================================================================================
//? view the appointments 
// for "patient" it displays available appointments
//===========================================================================================================

const view_available_appointments = async (req: Request, res: Response): Promise< void > => {
    try{

        // take data from the patient --------------------------------------------------------------------------------------------------
        const body: patient_make_appointment = req.body;

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
        let appointments_found: appointment_data[]  = [];
        

        if(!doctor_id){ // if no docotr specificed , get all the doctors from specific department in spcific date
            [appointments_found] = await database.query<appointment_data[]>(
            `SELECT appointment_time, user_fullname, user_gender FROM health_app.appointments as app INNER JOIN health_app.users as user ON app.doctor_id = user.user_id  WHERE app.appointment_status = 'available' AND app.appointment_date = ? AND user.user_department = ?`, [appointment_date, department]);

        }else{// when a specific doctor is choosed, get only his available appointments in spcific date
            [appointments_found] = await database.query<appointment_data[]>(
            `SELECT appointment_time FROM health_app.appointments AS app INNER JOIN health_app.users AS user ON app.doctor_id = user.user_id  WHERE app.appointment_status = 'available' AND app.appointment_date = ? AND user.user_department = ? AND  app.doctor_id = ?`, [appointment_date, department, doctor_id]);

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

//===========================================================================================================

export {view_available_appointments};