//===========================================================================================================
//? Import 
//==========================================================================================================
import { Request, Response } from 'express';

//importing hashing library
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//import enums
import {role, gender, bloodTypes, departments} from '../enums/userEnum'
//import interfaces:
import { user_signin_data , login_data} from '../interfaces/authenticationInterface';

//import Models
import User from '../models/usersModel';

//import helper function 
import { validateEnum } from '../helpers/validateEnumValue';
import { extractJWTData } from '../helpers/extractJWTData';
//==========================================================================================================

class AuthServices{

    //? =================================================================================================================================
    //? Sign Up function 
    // =================================================================================================================================
    async signUp(req: Request, res: Response): Promise<void>{
        try {
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

        
            // take the inputs and ensure all fields provided

            if (!user_role || !user_fullname || !user_gender || !user_address || !user_phone || !user_email || !user_birth_date || !user_password ) {
                console.error("Fill all Fields please");
                res.status(400).json({ message: "Fill all Fields please" });
                return ;
            }
            //---------------------------------------------------------------------------------------------------------------------------------------
            // check that the user is not already regestired in our system (by verifying special username)
            const dubplicatedEmails = await User.findOne({
                where:{
                    userEmail: user_email
                }
            })

            // Check that username is not used in the database
            if(dubplicatedEmails){
                console.error("Email-address already used, use another one!");
                res.status(400).json({ message: "Email-address already used, use another one!" });
                return; 
            }

            //---------------------------------------------------------------------------------------------------------------------------------------
            // generate id and check its uniqueness
            let user_id: number;
            let unique: User[];
            do{
                user_id = Math.floor(10000000 + Math.random() * 90000000);// generate user id

                unique = await User.findAll({
                    where: {
                        userID: user_id
                    }
                })
            }
            while(unique.length !== 0)
            
            //-------------------------------------------------------------------------
            // hashe the user_password
            const hashed_password: string = await bcrypt.hash(user_password, 8);

            // add user data to the database

            //check whether the user provided data are accepted value
            if(!validateEnum(user_role, role)){
                console.error("Invalid user role!");
                res.status(400).json({ message:"Invalid user role!" });
                return ;
            }                
            if (!validateEnum(user_gender, gender)) {
                console.error("Invalid user gender!");
                res.status(400).json({ message:"Invalid user gender!" });
                return ;
            }
            if (user_blood_type && !validateEnum(user_blood_type, bloodTypes)) { // ensure the user provided bloodType, then check it's not null/undefined/empty
                console.error("Invalid user blood Type!");
                res.status(400).json({ message:"Invalid user blood Type!" });
                return ;
            }
            if (user_department && !validateEnum(user_department, departments)) {
                console.error("Invalid user department!");
                res.status(400).json({ message:"Invalid user  department!" });
                return ;
            }

            const newUser = await User.create({// if executed successfully it returns model instance, otherwise it raise an error(if-verfication block won't be reached. no need for it)
                userID: user_id,
                userRole: user_role as role,
                userName: user_fullname,
                userGender: user_gender as gender,
                userAddress: user_address,
                userPhone: user_phone,
                userEmail: user_email,
                userBirthDate: new Date(user_birth_date),
                userBloodType: user_blood_type as bloodTypes,
                userDepartment : user_department as departments,
                userHashedPassword: hashed_password                
            });

            console.log(`"${user_fullname}" registered successfully, please log in`);
            res.status(201).json({ message: `${user_fullname} registered successfully, please log in` });
            return ;
            //---------------------------------------------------------------------------------------------------------------------------------------
            } catch (error) {
                console.error(`Error Found while Registering user`, error);
                res.status(500).json({ message: `Error Found while Registering user`, error });
                return;
            }
    }
    //? =================================================================================================================================
    //? Lgoin function
    // =================================================================================================================================
    async login(req: Request, res: Response): Promise<void>{
        try{
            // extract the login credentials from the request body
            const body: login_data = req.body;

            const {
                user_email, 
                user_password
            } = body;

            //check if the user provided all the needed data
            if( !user_email || !user_password){
                res.status(400).json({message: "Fill all Fields please" });
                return ;
            }

            //====================================================================================================================================================
            // check if user registed in the system

            const userExists = await User.findOne({
                where:{
                    userEmail: user_email
                }
            })

            if(!userExists){
                console.error("No user found with the provided data")
                res.status(400).json({message: "No user found with the provided data"});
                return ;
            }
            //=================================================================================================================================================
            // validate the provided password 

            const valid_password: boolean = await bcrypt.compare(user_password, userExists.userHashedPassword);

            if(valid_password){
                //---------------------------------------------------------------------------------------------------------------------------------------------
                // Create JWT 
                
                const JWT_key = process.env.JWT_key;
                // check that the key exists
                if(!JWT_key){
                    console.log("Error in fetching JWT secret key");
                    res.status(401).json({message: "Error in fetching JWT secret key"});
                    return ;
                }

                const token: string = jwt.sign({user_id: userExists.userID, user_role: userExists.userRole, user_fullname: userExists.userName}, JWT_key);
                
                //---------------------------------------------------------------------------------------------------------------------------------------------
                // Generate cookie and store JWT inside it
                res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours in milliseconds

                console.log(`"${userExists.userName}" logged in`); 
                res.status(200).json({ message: `${userExists.userName} logged in`, token: token });
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
            console.log(`Error Found while Logging in`, error);
            res.status(500).json({ message: `Error Found while Logging in`, error });    
            return;     
        }
    }
    //? =================================================================================================================================
    //? Logout function
    // =================================================================================================================================

    async logout(req: Request, res: Response): Promise<void>{
        try {
            const user_data = extractJWTData(req, res);

            if(!user_data){ // when no user_data found, we stop the function and return nothing, error message already sent from extract_token_data function so i didn't write another one here
                return;
            }

            // get the user name from the token
            const name: string = user_data.user_fullname //"fix the auth func "

            // remove the token from the cookie
            res.clearCookie('token');

            console.log(`User with this id : "${name}" logged out\n`); // test, can delete later
            res.json({ message: `User logged out (${name})` });
            return ;

        // ===============================================================================================================================
        } catch (error) {
            console.error("Error during logout:", error);
            res.status(500).json({ message: "Error during logout:", error });
            return;
        }
    }
}


export { AuthServices}
