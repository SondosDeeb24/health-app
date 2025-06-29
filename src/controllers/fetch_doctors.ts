//===========================================================================================================
//? Import 
//===========================================================================================================

import database from '../database_connection';

import { Request, Response } from 'express';

import { RowDataPacket } from "mysql2";

import { params } from '../interfaces/first';

//===========================================================================================================
//? function to fetch all the doctors (optional criteria: by department)
//===========================================================================================================
const fetch_doctors = async (req: Request<params>, res: Response): Promise< void > =>{

    try{
       const {dr_department} = req.params; // extract the department from the URL 

        interface x extends RowDataPacket{
            user_id: string,
            user_fullname: string
        }

        let doctors: x[] = []; // declare the doctors array
        
        if (!dr_department){
            [doctors] = await database.query< x[] >("SELECT user_id , user_fullname FROM health_app.users WHERE user_role= ?", ['doctor']);
        }else{
            [doctors] = await database.query< x[] >("SELECT user_id , user_fullname FROM health_app.users WHERE user_role= ? AND user_department= ?", ['doctor', dr_department]);
        }


        if (doctors.length == 0) { 
            console.log("We have no doctors currently!")
            res.status(400).json({ message: "We have no doctors currently!" });
            return ;
        }

        res.status(200).json(doctors);
        return ;
    }catch(error){
        console.log("Error while getting the doctors, try again please");
        res.status(400).json({message: "Error while getting the doctors, try again please"});
        return;
    }
}

//===========================================================================================================
export {fetch_doctors};