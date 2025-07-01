//===========================================================================================================
//? Import 
//===========================================================================================================
import database from "../database_connection";
//import hashing library
import bcrypt from "bcrypt";

//import json web token library, to create JWTs
import jwt from 'jsonwebtoken';


import path from 'path';
import dotenv from 'dotenv';
// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });


import {Request, Response} from 'express';
import { RowDataPacket } from "mysql2"; //import type for database metadata result

//import interface for data we will receive from ther user
import { login_data } from "../interfaces/login";


//===========================================================================================================
//? function for login
//===========================================================================================================

const login = async (req: Request , res: Response): Promise< void > => {
    try{
        // extract the login credentials from the request body
        const body: login_data = req.body;

        const {
            email, 
            password
        } = body;

        //check if the user provided all the needed data
        if( !email || !password){
            res.status(400).json({message: "Fill all Fields please" });
            return ;
        }

        //====================================================================================================================================================
        // check if user registed in the system

        const [user_exist] = await database.query< RowDataPacket[] >('SELECT * FROM health_app.users WHERE user_email = ?' , [email]);

        if(user_exist.length == 0 ){
            res.status(400).json({message: "No user found with the provided data"});
            return ;
        }
        
        const user: RowDataPacket= user_exist[0];
        //=================================================================================================================================================
        // validate the provided password 

        const valid_password: boolean = await bcrypt.compare(password, user.user_hashed_password);

        if(valid_password){
            //---------------------------------------------------------------------------------------------------------------------------------------------
            // create JWT 
            const JWT_key = process.env.JWT_key;
            // check that the key exists in the first place
            if(!JWT_key){
                console.log("Error in fetching JWT secret key");
                res.status(401).json({message: "Error in fetching JWT secret key"});
                return ;
            }

            const token: string = jwt.sign({user_id: user.user_id, user_role: user.user_role, user_fullname: user.user_fullname}, JWT_key);
            
            //---------------------------------------------------------------------------------------------------------------------------------------------
            // Generate cookie and store JWT inside it
            res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours in milliseconds


            console.log(`"${user.user_fullname}" logged in`); 
            res.status(200).json({ message: `${user.user_fullname} logged in`, token: token });
            return ;
        }

        else{
            console.log("password is wrong, please try again");
            res.status(401).json({message: "password is wrong, please try again"});
            return ;
        }

    //=========================================================================================
    }
    catch(error){
        console.log(`Error Found while Loging in`, error);
        res.status(201).json({ message: `Error Found while Loging in`, error });    
        return;     
    }


}

//========================================================================================= 

export {login} ; 
