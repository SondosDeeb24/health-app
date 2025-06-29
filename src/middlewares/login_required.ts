//=======================================================================================
//? Import
//=======================================================================================

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { JWT_data } from '../interfaces/first';//  import JWT_data interface (which have the attributes stored in token)
//=======================================================================================
//? Authentication functions:
// it ensures that only logged in users are able to access the routes
//=======================================================================================

// interface JWT_data{
//     user_id: string;
//     user_fullname: string;
//     user_role: string;
// }
const login_required = (req: Request, res: Response, next: NextFunction): void  => {
  try {
    // take the token from the cookie 
    const token: string = req.cookies.token;

    if(!token){
            console.log("Session expired, Please log in again")
            res.status(401).json({message: "Session expired, Please log in again---------"});
            return ;
    }
    
    const JWT_key = process.env.JWT_key;
    if(!JWT_key){
        console.error("Internal Error! missing token key in environment file");
        res.status(500).json({message: "Internal Error! missing token key in environment file"});
        return ;
    }

    const user_data = jwt.verify(token, JWT_key) as JWT_data;
    if(!user_data || typeof user_data !== "object"){
        console.log("Invalid JWT token");
        res.status(401).json({message: "Invalid JWT token"});
        return ;
    }
    

    next(); // Pass control to the next middleware/route

    //-------------------------------------------------------------------------------------
  } catch (error) {
    console.error('Middleware error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


//=======================================================================================
export { login_required };









//=======================================================================================





