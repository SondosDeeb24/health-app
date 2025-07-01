//==================================================================================================================
//? Import express types
//==================================================================================================================

import {Request, Response} from "express";

// import a helper function to extract user data from the token
import { extract_token_data } from "../helpers/get_token_data";

//==================================================================================================================
//? Log out function
//==================================================================================================================

const logout = async (req: Request, res: Response): Promise<void> => {
    try {

        const user_data = extract_token_data(req, res);

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

//==================================================================================================================

export {logout};