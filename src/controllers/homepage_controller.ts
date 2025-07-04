//===========================================================================================================
//? Import 
//===========================================================================================================
import { Request, Response } from "express";

// import a helper function to extract user data from the token
import {extract_token_data} from '../helpers/get_token_data';


//===========================================================================================================
//
//===========================================================================================================
// temp func (it will be updated soon!)

const test = async (req: Request, res: Response): Promise< void> =>{

    const user = extract_token_data(req, res);

    if(!user){
        return;
    }
    console.log(`welcome ${user.user_fullname}` );
    res.status(201).json({message:`welcome ${user?.user_fullname}` });
    return ;

}

//===========================================================================================================

export {test};