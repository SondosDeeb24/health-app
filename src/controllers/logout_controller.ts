//==================================================================================================================
//? Import express types
//==================================================================================================================

import {Request, Response} from "express";

//==================================================================================================================
//? Log out function
//==================================================================================================================

const logout = async (req: Request, res: Response): Promise<any> => {
    try {
        // remove the token from the cookie
        res.clearCookie('token');
        // const id: string = req.user.username;

        //temporary :
        const name: string = "fix the auth func "

        console.log(`User with this id : "${name}" logged out\n`); // test, can delete later
        return res.json({ message: `User logged out (${name})` });

    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
}

//==================================================================================================================

export {logout};