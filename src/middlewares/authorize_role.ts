//=======================================================================================
//? Import
//=======================================================================================

import { Request, Response, NextFunction } from 'express';

import { extract_token_data } from '../helpers/extractJWTData';


//=======================================================================================
//? function that will protect cetain pages from unauthorized access (anyone but doctors)
// strict the access for some page to the doctors only
//=======================================================================================

const authorize_role = async (req: Request, res: Response, next: NextFunction): Promise<void> =>{

    const token_data = extract_token_data(req, res);
    if(!token_data){ // error message will be sent from get_token_data.ts file
        return ; 
    }

    if(token_data.user_role !== "doctor"){
        console.log("Access Denied!");
        res.status(500).json({message: "Access Denied!"});
        return ;
    }
    
    next();

}

//=======================================================================================
export {authorize_role};