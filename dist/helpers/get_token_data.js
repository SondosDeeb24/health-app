"use strict";
//=============================================================
//? Importing 
//=============================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract_token_data = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const extract_token_data = (req, res) => {
    try {
        // take the token from the cookie 
        const token = req.cookies.token;
        if (!token) {
            console.log("Session expired, Please log in again");
            res.status(401).json({ message: "Session expired, Please log in again" });
            return null;
        }
        const JWT_key = process.env.JWT_key;
        if (!JWT_key) {
            console.error("Internal Error! missing token key in environment file");
            res.status(500).json({ message: "Internal Error! missing token key in environment file" });
            return null;
        }
        const user_data = jsonwebtoken_1.default.verify(token, JWT_key);
        if (!user_data || typeof user_data !== "object") {
            console.log("Invalid JWT token");
            res.status(401).json({ message: "Invalid JWT token" });
            return null;
        }
        return user_data;
        //---------------------------------------------------------------------------------------------------------------------    
    }
    catch (error) {
        console.log('Error Found while verification the token', error);
        res.status(401).json({ message: 'Error Found while verification the token', error });
        return null;
    }
};
exports.extract_token_data = extract_token_data;
