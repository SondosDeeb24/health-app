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
//importing hashing library
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
    user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, user_password, user_blood_type, user_department } = body;
    try {
        // take the inputs and ensure all fields provided
        if (!user_role || !user_fullname || !user_gender || !user_address || !user_phone || !user_email || !user_birth_date || !user_password) {
            console.log("Fill all Fields please");
            res.status(400).json({ message: "Fill all Fields please" });
            return;
        }
        //---------------------------------------------------------------------------------------------------------------------------------------
        // check that the user is not already regestired in our system (by verifying special username)
        const [found] = yield database_connection_1.default.query(// the .query will return array of objects where each object has both the properties of 
        'SELECT * FROM health_app.users WHERE user_email = ?', [user_email]); //  "user_signin_data" interface  and(& (it's intersection)) whatever RowDataPacket includes. NOTE: RowDataPacket is object that contains the selected row data in object form 
        // Check that username is not used in the database 
        if (found.length !== 0) {
            console.log("Email-address already used, use another one!");
            res.status(400).json({ message: "Email-address already used, use another one!" });
            return;
        }
        //---------------------------------------------------------------------------------------------------------------------------------------
        // generate id and check its uniqueness
        let user_id;
        let unique;
        do {
            user_id = Math.floor(10000000 + Math.random() * 90000000); // generate user id
            [unique] = yield database_connection_1.default.query('SELECT * FROM health_app.users WHERE user_id = ?', [user_id]);
        } while (unique.length !== 0);
        //-------------------------------------------------------------------------
        // hashe the user_password
        const hashed_password = yield bcrypt_1.default.hash(user_password, 8);
        // add user data to the database
        const [adding_user] = yield database_connection_1.default.query("INSERT INTO health_app.users (user_id, user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, user_hashed_password, user_blood_type, user_department) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [user_id, user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, hashed_password, user_blood_type, user_department]);
        if (adding_user.affectedRows == 0) { //affectedRows - it return the number of changed, added or deleted row  by the last statment
            console.log('Databaes Error, User was not registered!');
            res.status(500).json({ message: 'Database error, User was not registered!' });
            return;
        }
        console.log(`"${user_fullname}" registered successfully, please log in`);
        res.status(201).json({ message: `${user_fullname} registered successfully, please log in` });
        return;
        //---------------------------------------------------------------------------------------------------------------------------------------
    }
    catch (error) {
        console.log(`Error Found while Registering "${user_fullname}"`, error);
        res.status(500).json({ message: `Error Found while Registering ${user_fullname}`, error });
        return;
    }
});
exports.sign_in = sign_in;
