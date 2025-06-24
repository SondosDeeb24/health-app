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
exports.sign_in = void 0;
//===========================================================================================================
//? Import : 
// Database connection 
// Hashing  library (bcrypt)
// types for request handling and database querites results (from express and mysql2)
//===========================================================================================================
const database_connection_1 = __importDefault(require("../database_connection"));
const bcrypt_1 = __importDefault(require("bcrypt"));
//===========================================================================================================
//? Sign in function
//===========================================================================================================
const sign_in = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // declaring new variable called "body" and initializing it with values from req.body, 
    // and sepcify that it should have the same properties like "user_singin_data" interface
    const body = req.body;
    console.log(body); //this print the data of the user how sent request to sign in
    const { // destructuring the properties in body variable (which contains the values from req.body)
    username, user_fullname, user_blood_type, user_sex, user_address, user_phone, user_email, user_birth_date, user_password } = body;
    try {
        // take the inputs and ensure all fields provided
        if (!username || !user_fullname || !user_blood_type || !user_sex || !user_address || !user_phone || !user_email || !user_birth_date || !user_password) {
            return res.status(400).json({ message: "Fill all Fields please" });
        }
        //---------------------------------------------------------------------------------------------------------------------------------------
        // check that the user is not already regestired in our system (by verifying special username)
        const [found] = yield database_connection_1.default.query(// the .query will return array of objects where each object has both the properties of 
        'SELECT * FROM health_app.users WHERE username = ?', [username]); //  "user_signin_data" interface  and(& (it's intersection)) whatever RowDataPacket includes. NOTE: RowDataPacket is object that contains the selected row data in object form 
        // Check that username is not used in the database 
        if (found.length !== 0) {
            console.log("Username already used, write another one!");
            return res.status(400).json({ message: "Username already used, write another one!" });
        }
        //---------------------------------------------------------------------------------------------------------------------------------------
        // hashing the user_password
        const hashed_password = yield bcrypt_1.default.hash(user_password, 8);
        // add user data to the database
        const [adding_user] = yield database_connection_1.default.query("INSERT INTO health_app.users (username, user_fullname, user_blood_type, user_sex, user_address, user_phone, user_email, user_birth_date, user_hashed_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [username, user_fullname, user_blood_type, user_sex, user_address, user_phone, user_email, user_birth_date, hashed_password]);
        if (adding_user.affectedRows == 0) { //affectedRows - it return the number of changed, added or deleted row  by the last statment
            console.log('Databaes Error, User was not registered!');
            return res.status(500).json({ message: 'Database error, User was not registered!' });
        }
        console.log(`"${user_fullname}" registered successfully, please log in`);
        return res.status(201).json({ message: `${user_fullname} registered successfully, please log in` });
        //---------------------------------------------------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log(`Error Found while Registering "${user_fullname}"`, error);
        return res.status(201).json({ message: `Error Found while Registering ${user_fullname}`, error });
    }
});
exports.sign_in = sign_in;
