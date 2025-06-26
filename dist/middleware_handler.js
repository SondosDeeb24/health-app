"use strict";
//=============================================================
//? Importing 
//=============================================================
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
exports.loggedin_only = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const loggedin_only = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // take the token from the cookie 
    const token = req.cookies.token;
    if (!token) {
        console.log("Access denied. no tokent found, not logged in user can't be here!");
        res.status(401).json({ message: "Access denied. no tokent found, not logged in user can't be here!" });
        return;
    }
    //-----------------------------------------------------------------------------------------------------
    // if token exists, check it's validation 
    const JWT_key = process.env.JWT_key;
    jsonwebtoken_1.default.verify(token, JWT_key, (error, result) => {
        if (error) {
            console.log("Access denied. Invalid or Expired token, login please");
            res.status(401).json({ message: "Access denied. Invalid or Expired token, login please" });
            return;
        }
        req.result = result;
        next(); // here I have to call next() to pass contorl to next function or route , otherwise the code will get stuck
    });
});
exports.loggedin_only = loggedin_only;
