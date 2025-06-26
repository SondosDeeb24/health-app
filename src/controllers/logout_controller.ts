//==================================================================================================================
//? Import express types
//==================================================================================================================

import {Request, Response} from "express";

import { extract_token_data } from "../helpers/get_token_data";

//==================================================================================================================
//? Log out function
//==================================================================================================================

const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        // remove the token from the cookie
        res.clearCookie('token');
        
        const user_data = extract_token_data(req, res);

        if(!user_data){ // when no user_data found, we get null to stop the function, error message already sent from extract_token_data function
            return;
        }

        //temporary :
        const name: string = user_data.user_fullname //"fix the auth func "

        console.log(`User with this id : "${name}" logged out\n`); // test, can delete later
        return res.json({ message: `User logged out (${name})` });

        // console.log(`User logged out\n`); // test, can delete later
        // return res.json({ message: `User logged out ` });

    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

//==================================================================================================================

export {logout};