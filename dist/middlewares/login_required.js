"use strict";
//=======================================================================================
//? Import
//=======================================================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login_required = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//=======================================================================================
//? Authentication functions:
// it ensures that only logged in users are able to access the routes
//=======================================================================================
const login_required = (req, res, next) => {
    try {
        // take the token from the cookie 
        const token = req.cookies.token;
        if (!token) {
            console.log("Session expired, Please log in again");
            res.status(401).json({ message: "Session expired, Please log in again" });
            return;
        }
        const JWT_key = process.env.JWT_key;
        if (!JWT_key) {
            console.error("Internal Error! missing token key in environment file");
            res.status(500).json({ message: "Internal Error! missing token key in environment file" });
            return;
        }
        const user_data = jsonwebtoken_1.default.verify(token, JWT_key);
        if (!user_data || typeof user_data !== "object") {
            console.log("Invalid JWT token");
            res.status(401).json({ message: "Invalid JWT token" });
            return;
        }
        next(); // Pass control to the next middleware/route
        //-------------------------------------------------------------------------------------
    }
    catch (error) {
        console.error('Middleware error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
exports.login_required = login_required;
//=======================================================================================
