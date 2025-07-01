//===========================================================================================================
//? Import 
//===========================================================================================================

import database from '../../database_connection';
import { Request, Response } from 'express';

// import a helper function to extract user data from the token
import {extract_token_data} from '../../helpers/get_token_data';

//import interfaces
import {appointment_data} from '../../interfaces/common_view_appointment';
import {patient_fullname} from '../../interfaces/view_booked_appointments';
//===========================================================================================================
//? view all the appointments 
// for "doctor" it displays booked appointemnt 
//===========================================================================================================


const view_appointments = async (req: Request, res: Response): Promise< void > => {
    try{

        //----------------------------------------------------------------------
        // get the doctor data from the token 
        const user_data = extract_token_data(req, res);
        if(!user_data ){ // when NO user_data found, we get null. in this case we have to stop the function ( no need to send response because  error message was already sent from extract_token_data function)
            return;
        }

        //----------------------------------------------------------------------
        // fetch all booked appointment for the doctor
        const [appointments_found] = await database.query< appointment_data[]>( `SELECT DATE_FORMAT(appointment_date, '%Y-%m-%d') AS appointment_date, appointment_time, patient_id FROM health_app.appointments WHERE doctor_id = ${user_data.user_id} AND appointment_status = 'booked' ` );
        
        // if doctor has no appointments, then stop the funciton 
        if(appointments_found.length == 0){
            console.log('you have no appointments');
            res.status(200).json({message: 'you have no appointments'});
            return;
        }

        //----------------------------------------------------------------------
        // add the patient_fullname(user_fullanme) property to every object (booked appointment) in appointments_found array
        for(let i = 0; i< appointments_found.length ; i++ ){
            const patient_id: number = appointments_found[i].patient_id ;

            const [patient_name] = await database.query<patient_fullname[]>("SELECT user_fullname FROM health_app.users WHERE user_id = ?", [patient_id]);
            if(patient_name.length == 0){
                console.log('Sorry, no user file found for this patient');
                res.status(200).json({message: 'Sorry, no user file found for this patient'});
                return;
            }
            appointments_found[i].patient_fullname = patient_name[i].user_fullname;
        }

        //----------------------------------------------------------------------
        // if appointments found, display it to the doctor 
        console.log(appointments_found);
        res.status(200).json(appointments_found);
        return ;

    //===========================================================================================================
    }catch(error){
        console.log(`Error Occured while fetching the appointments. Error: ${error}`);
        res.status(400).json({message:`Error Occured while fetching the appointments. Error: ${error}` });
    }
}

//===========================================================================================================

export {view_appointments};