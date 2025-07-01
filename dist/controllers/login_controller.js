"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
//===========================================================================================================
//? Import 
//===========================================================================================================
const database_connection_1 = __importDefault(require("../database_connection"));
//import hashing library
const bcrypt_1 = __importDefault(require("bcrypt"));
//import json web token library, to create JWTs
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//===========================================================================================================
//? function for login
//===========================================================================================================
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // extract the login credentials from the request body
        const body = req.body;
        const { email, password } = body;
        //check if the user provided all the needed data
        if (!email || !password) {
            res.status(400).json({ message: "Fill all Fields please" });
            return;
        }
        //====================================================================================================================================================
        // check if user registed in the system
        const [user_exist] = yield database_connection_1.default.query('SELECT * FROM health_app.users WHERE user_email = ?', [email]);
        if (user_exist.length == 0) {
            res.status(400).json({ message: "No user found with the provided data" });
            return;
        }
        const user = user_exist[0];
        //=================================================================================================================================================
        // validate the provided password 
        const valid_password = yield bcrypt_1.default.compare(password, user.user_hashed_password);
        if (valid_password) {
            //---------------------------------------------------------------------------------------------------------------------------------------------
            // create JWT 
            const JWT_key = process.env.JWT_key;
            // check that the key exists in the first place
            if (!JWT_key) {
                console.log("Error in fetching JWT secret key");
                res.status(401).json({ message: "Error in fetching JWT secret key" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({ user_id: user.user_id, user_role: user.user_role, user_fullname: user.user_fullname }, JWT_key);
            //---------------------------------------------------------------------------------------------------------------------------------------------
            // Generate cookie and store JWT inside it
            res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours in milliseconds
            console.log(`"${user.user_fullname}" logged in`);
            res.status(200).json({ message: `${user.user_fullname} logged in`, token: token });
            return;
        }
        else {
            console.log("password is wrong, please try again");
            res.status(401).json({ message: "password is wrong, please try again" });
            return;
        }
        //=========================================================================================
    }
    catch (error) {
        console.log(`Error Found while Loging in`, error);
        res.status(201).json({ message: `Error Found while Loging in`, error });
        return;
    }
});
exports.login = login;
