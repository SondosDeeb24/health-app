"use strict";
//==================================================================================================================
//? Import express types
//==================================================================================================================
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const get_token_data_1 = require("../helpers/get_token_data");
//==================================================================================================================
//? Log out function
//==================================================================================================================
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // remove the token from the cookie
        res.clearCookie('token');
        const user_data = (0, get_token_data_1.extract_token_data)(req, res);
        if (!user_data) { // when no user_data found, we get null to stop the function, error message already sent from extract_token_data function
            return;
        }
        //temporary :
        const name = user_data.user_fullname; //"fix the auth func "
        console.log(`User with this id : "${name}" logged out\n`); // test, can delete later
        return res.json({ message: `User logged out (${name})` });
        // console.log(`User logged out\n`); // test, can delete later
        // return res.json({ message: `User logged out ` });
    }
    catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: 'Internal server error', error });
    }
});
exports.logout = logout;
