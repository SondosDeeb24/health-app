//===========================================================================================================
//? Import : 
// Database connection 
// Hashing  library (bcrypt)
// types for request handling and database querites results (from express and mysql2)
//===========================================================================================================
import database from "../database_connection";
import bcrypt from "bcrypt";

import {Request, Response} from "express";

import { RowDataPacket, ResultSetHeader } from "mysql2";

import { user_signin_data } from "../interfaces/first";

//===========================================================================================================
//? Sign in function
//===========================================================================================================

const sign_in = async (req: Request, res: Response): Promise< any > => { // this function will return Response object that have return value( mostly in my case here it's string )
    
    // declaring new variable called "body" and initializing it with values from req.body, 
    // and sepcify that it should have the same properties like "user_singin_data" interface
    const body: user_signin_data = req.body;

    console.log(body); //this print the data of the user how sent request to sign in

    const { // destructuring the properties in body variable (which contains the values from req.body)
        user_role,
        user_fullname,
        user_gender,
        user_address,
        user_phone,
        user_email,
        user_birth_date,
        user_password,
        user_blood_type,
        user_department
    } = body ;

    try {
        // take the inputs and ensure all fields provided

        if (!user_role || !user_fullname || user_gender == undefined || !user_address || !user_phone || !user_email || !user_birth_date || !user_password ) {
            return res.status(400).json({ message: "Fill all Fields please" });
        }
        //---------------------------------------------------------------------------------------------------------------------------------------
        // check that the user is not already regestired in our system (by verifying special username)

        const [found] = await database.query<user_signin_data[] > ( // the .query will return array of objects where each object has both the properties of 
            'SELECT * FROM health_app.users WHERE user_email = ?', [user_email] );       //  "user_signin_data" interface  and(& (it's intersection)) whatever RowDataPacket includes. NOTE: RowDataPacket is object that contains the selected row data in object form 
            

        // Check that username is not used in the database 
        if (found.length !== 0) { 
            console.log("Email-address already used, use another one!")
            return res.status(400).json({ message: "Email-address already used, use another one!" });
        }

        //---------------------------------------------------------------------------------------------------------------------------------------
        // generate id and check its uniqueness
        let user_id: number;
        let unique: user_signin_data[];
        do{
            user_id = Math.floor(10000000 + Math.random() * 90000000);

            [unique] = await database.query<user_signin_data[]> (
                'SELECT * FROM health_app.users WHERE user_id = ?', [user_id]);
        }
        while(unique.length !== 0)
        
        // hashe the user_password
        const hashed_password: string = await bcrypt.hash(user_password, 8);

        // add user data to the database
        const [adding_user] = await database.query< ResultSetHeader>(
            "INSERT INTO health_app.users (user_id, user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, user_hashed_password, user_blood_type, user_department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [user_id, user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, hashed_password, user_blood_type, user_department]);
  
        if (adding_user.affectedRows == 0) {  //affectedRows - it return the number of changed, added or deleted row  by the last statment
            console.log('Databaes Error, User was not registered!')
            return res.status(500).json({ message: 'Database error, User was not registered!' });
        }


        console.log(`"${user_fullname}" registered successfully, please log in`);
        return res.status(201).json({ message: `${user_fullname} registered successfully, please log in` });
        //---------------------------------------------------------------------------------------------------------------------------------------
    } catch (error) {
        console.log(`Error Found while Registering "${user_fullname}"`, error);
        return res.status(201).json({ message: `Error Found while Registering ${user_fullname}`, error });
    }

}

//===========================================================================================================

export {sign_in}; // named export, so i can export other functions if needed
