//===========================================================================================================
//? Import 
//===========================================================================================================

import database from '../../database_connection';
import { Request, Response } from 'express';
import { ResultSetHeader, RowDataPacket } from "mysql2";

//importing interfaces from interface folder:
import { define_available_appointments } from '../../interfaces/define_appointments';

// import uuid (Universally Unique Identifier)
import {v4 as uuidv4} from 'uuid';

//import helper to get the user data from the token
import { extract_token_data } from '../../helpers/get_token_data';

//import enum for the valid apponitment status
import { appointment_status } from '../../enums/define_available_appointments';
//===========================================================================================================
//? create new appointment
//===========================================================================================================


const define_available_appointment = async (req: Request, res: Response): Promise <void> => {
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

        const doctor_id = extract_token_data(req, res);
        if(!doctor_id){ //if no tokent data found stop the operation. (json response is send from extract_token_data function)
            return;
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //check if a available appointment was alreayd added to that doctor at the same time for the specified date
        const [appointment_exists] = await database.query<RowDataPacket[]>("SELECT * FROM health_app.appointments WHERE appointment_date = ? AND appointment_time = ?  AND doctor_id = ? ", [appointment_date, appointment_time, doctor_id.user_id]);

        if(appointment_exists.length !== 0){
            console.log("Appointment is already added!");
            res.status(208).json({message: "Appointment is already added!"}); //208 status is already reported
            return;
        }

        // construct appointment_id ---------------------------------------------------------------------------------------------------------------------
        // i'm using Universally Unique Identifires ( a 128-bit data object)
        let appointment_id = uuidv4();

        // insert the data into the database --------------------------------------------------------------------------------------------------------------------

        const [add_appointment] = await database.query< ResultSetHeader>("INSERT INTO health_app.appointments (appointment_id, doctor_id, appointment_date, appointment_time, appointment_status) VALUES (?, ?, ?, ?, ?)"
            , [appointment_id, doctor_id.user_id, appointment_date, appointment_time, appointment_status.available]);

        if(add_appointment.affectedRows == 0){
            console.log('Databaes Error, Appointment was not reserved!')
            res.status(500).json({ message: 'Databaes Error, Appointment was not reserved!' });
            return ;
        }

        

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

//===========================================================================================================

export {define_available_appointment};