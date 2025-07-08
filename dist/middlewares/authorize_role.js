"use strict";
//=======================================================================================
//? Import
//=======================================================================================
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
exports.authorize_role = void 0;
const extractJWTData_1 = require("../helpers/extractJWTData");
//=======================================================================================
//? function that will protect cetain pages from unauthorized access (anyone but doctors)
// strict the access for some page to the doctors only
//=======================================================================================
const authorize_role = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token_data = (0, extractJWTData_1.extract_token_data)(req, res);
    if (!token_data) { // error message will be sent from get_token_data.ts file
        return;
    }
    if (token_data.user_role !== "doctor") {
        console.log("Access Denied!");
        res.status(500).json({ message: "Access Denied!" });
        return;
    }
    next();
});
exports.authorize_role = authorize_role;
