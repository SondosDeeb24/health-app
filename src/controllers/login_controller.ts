//===========================================================================================================
//? Import 
//===========================================================================================================
import database from "../database_connection";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

import path from 'path';
import dotenv from 'dotenv';

// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import {Request, Response} from 'express';

import { RowDataPacket, ResultSetHeader } from "mysql2";
//===========================================================================================================


const login = async (req: Request , res: Response): Promise< any > => {

    interface login_data {
        username: string;
        password: string;
    }
    
    const body: login_data = req.body;

    const {
        username, 
        password
    } = body;

    try{
        //check if the user provided all the needed data
        if( !username || !password){
            return res.status(400).json({message: "Fill all Fields please" });
        }

        //====================================================================================================================================================
        // check if user registed in the system

        const [user_exist] = await database.query< RowDataPacket[] >('SELECT * FROM health_app.users WHERE username = ?' , [username]);

        if(user_exist.length == 0 ){
            return res.status(400).json({message: "No user found with the provided data"});
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
                return res.status(401).json({message: "Error in fetching JWT secret key"});
            }

            const token: string = jwt.sign({username: user.username, user_fullname: user.user_fullname}, JWT_key);
            
            //---------------------------------------------------------------------------------------------------------------------------------------------
            // Generate cookie and store JWT inside it
            res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours in milliseconds


            console.log(`User "${user.username}" logged in`); 
            return res.status(200).json({ message: `User ${user.username} logged in`, token: token });
        }

        else{
            return res.status(401).json({message: "password is wrong, please try again"});
        }

    //=========================================================================================
    }
    catch(error){
        console.log(`Error Found while Loging in for "${username}"`, error);
        return res.status(201).json({ message: `Error Found while Loging in for ${username}`, error });        
    }


}

//========================================================================================= 

export {login} ; 
