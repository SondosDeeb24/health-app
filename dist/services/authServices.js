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
exports.AuthServices = void 0;
//importing hashing library
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//import enums
const userEnum_1 = require("../enums/userEnum");
//import Models
const usersModel_1 = __importDefault(require("../models/usersModel"));
//import helper function 
const validateEnumValue_1 = require("../helpers/validateEnumValue");
const extractJWTData_1 = require("../helpers/extractJWTData");
//==========================================================================================================
class AuthServices {
    //? =================================================================================================================================
    //? Sign Up function 
    // =================================================================================================================================
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                console.log(body); //this print the data of the user how sent request to sign in
                const { // destructuring the properties in body variable (which contains the values from req.body)
                user_role, user_fullname, user_gender, user_address, user_phone, user_email, user_birth_date, user_password, user_blood_type, user_department } = body;
                // take the inputs and ensure all fields provided
                if (!user_role || !user_fullname || !user_gender || !user_address || !user_phone || !user_email || !user_birth_date || !user_password) {
                    console.error("Fill all Fields please");
                    res.status(400).json({ message: "Fill all Fields please" });
                    return;
                }
                //---------------------------------------------------------------------------------------------------------------------------------------
                // check that the user is not already regestired in our system (by verifying special username)
                const dubplicatedEmails = yield usersModel_1.default.findOne({
                    where: {
                        userEmail: user_email
                    }
                });
                // Check that username is not used in the database
                if (dubplicatedEmails) {
                    console.error("Email-address already used, use another one!");
                    res.status(400).json({ message: "Email-address already used, use another one!" });
                    return;
                }
                //---------------------------------------------------------------------------------------------------------------------------------------
                // generate id and check its uniqueness
                let user_id;
                let unique;
                do {
                    user_id = Math.floor(10000000 + Math.random() * 90000000); // generate user id
                    unique = yield usersModel_1.default.findAll({
                        where: {
                            userID: user_id
                        }
                    });
                } while (unique.length !== 0);
                //-------------------------------------------------------------------------
                // hashe the user_password
                const hashed_password = yield bcrypt_1.default.hash(user_password, 8);
                // add user data to the database
                //check whether the user provided data are accepted value
                if (!(0, validateEnumValue_1.validateEnum)(user_role, userEnum_1.role)) {
                    console.error("Invalid user role!");
                    res.status(400).json({ message: "Invalid user role!" });
                    return;
                }
                if (!(0, validateEnumValue_1.validateEnum)(user_gender, userEnum_1.gender)) {
                    console.error("Invalid user gender!");
                    res.status(400).json({ message: "Invalid user gender!" });
                    return;
                }
                if (user_blood_type && !(0, validateEnumValue_1.validateEnum)(user_blood_type, userEnum_1.bloodTypes)) { // ensure the user provided bloodType, then check it's not null/undefined/empty
                    console.error("Invalid user blood Type!");
                    res.status(400).json({ message: "Invalid user blood Type!" });
                    return;
                }
                if (user_department && !(0, validateEnumValue_1.validateEnum)(user_department, userEnum_1.departments)) {
                    console.error("Invalid user department!");
                    res.status(400).json({ message: "Invalid user  department!" });
                    return;
                }
                const newUser = yield usersModel_1.default.create({
                    userID: user_id,
                    userRole: user_role,
                    userName: user_fullname,
                    userGender: user_gender,
                    userAddress: user_address,
                    userPhone: user_phone,
                    userEmail: user_email,
                    userBirthDate: new Date(user_birth_date),
                    userBloodType: user_blood_type,
                    userDepartment: user_department,
                    userHashedPassword: hashed_password
                });
                console.log(`"${user_fullname}" registered successfully, please log in`);
                res.status(201).json({ message: `${user_fullname} registered successfully, please log in` });
                return;
                //---------------------------------------------------------------------------------------------------------------------------------------
            }
            catch (error) {
                console.error(`Error Found while Registering user`, error);
                res.status(500).json({ message: `Error Found while Registering user`, error });
                return;
            }
        });
    }
    //? =================================================================================================================================
    //? Lgoin function
    // =================================================================================================================================
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // extract the login credentials from the request body
                const body = req.body;
                const { user_email, user_password } = body;
                //check if the user provided all the needed data
                if (!user_email || !user_password) {
                    res.status(400).json({ message: "Fill all Fields please" });
                    return;
                }
                //====================================================================================================================================================
                // check if user registed in the system
                const userExists = yield usersModel_1.default.findOne({
                    where: {
                        userEmail: user_email
                    }
                });
                if (!userExists) {
                    console.error("No user found with the provided data");
                    res.status(400).json({ message: "No user found with the provided data" });
                    return;
                }
                //=================================================================================================================================================
                // validate the provided password 
                const valid_password = yield bcrypt_1.default.compare(user_password, userExists.userHashedPassword);
                if (valid_password) {
                    //---------------------------------------------------------------------------------------------------------------------------------------------
                    // Create JWT 
                    const JWT_key = process.env.JWT_key;
                    // check that the key exists
                    if (!JWT_key) {
                        console.log("Error in fetching JWT secret key");
                        res.status(401).json({ message: "Error in fetching JWT secret key" });
                        return;
                    }
                    const token = jsonwebtoken_1.default.sign({ user_id: userExists.userID, user_role: userExists.userRole, user_fullname: userExists.userName }, JWT_key);
                    //---------------------------------------------------------------------------------------------------------------------------------------------
                    // Generate cookie and store JWT inside it
                    res.cookie('token', token, { httpOnly: true, maxAge: 7200000 }); // 2 hours in milliseconds
                    console.log(`"${userExists.userName}" logged in`);
                    res.status(200).json({ message: `${userExists.userName} logged in`, token: token });
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
                console.log(`Error Found while Logging in`, error);
                res.status(500).json({ message: `Error Found while Logging in`, error });
                return;
            }
        });
    }
    //? =================================================================================================================================
    //? Logout function
    // =================================================================================================================================
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_data = (0, extractJWTData_1.extractJWTData)(req, res);
                if (!user_data) { // when no user_data found, we stop the function and return nothing, error message already sent from extract_token_data function so i didn't write another one here
                    return;
                }
                // get the user name from the token
                const name = user_data.user_fullname; //"fix the auth func "
                // remove the token from the cookie
                res.clearCookie('token');
                console.log(`User with this id : "${name}" logged out\n`); // test, can delete later
                res.json({ message: `User logged out (${name})` });
                return;
                // ===============================================================================================================================
            }
            catch (error) {
                console.error("Error during logout:", error);
                res.status(500).json({ message: "Error during logout:", error });
                return;
            }
        });
    }
}
exports.AuthServices = AuthServices;
