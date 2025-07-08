//=============================================================
//? Importing 
//=============================================================

import { Request, Response } from "express";

// import json web token library to verify the token
import jwt from 'jsonwebtoken';

//=============================================================
//? function to extract user data from the token (JWT)
//=============================================================

interface JWT_data{
    user_id: number;
    user_fullname: string;
    user_role: string;
}

const extract_token_data =  (req: Request, res: Response ): JWT_data | null => {

    try{
        // take the token from the cookie 
        const token: string = req.cookies.token;

        if(!token){
            console.log("Session expired, Please log in again")
            res.status(401).json({message: "Session expired, Please log in again"});
            return null;
        }
        
        const JWT_key = process.env.JWT_key;
        if(!JWT_key){
            console.error("Internal Error! missing token key in environment file");
            res.status(500).json({message: "Internal Error! missing token key in environment file"});
            return null;
        }

        const user_data = jwt.verify(token, JWT_key) as JWT_data;
        if(!user_data || typeof user_data !== "object"){
            console.log("Invalid JWT token");
            res.status(401).json({message: "Invalid JWT token"});
            return null;
        }
        return user_data;

    //---------------------------------------------------------------------------------------------------------------------    
    }catch(error){
        console.log('Error Found while verification the token', error);
        res.status(401).json({message:'Error Found while verification the token', error});
        return null;
    }
}    
//=============================================================
export {extract_token_data} ; 