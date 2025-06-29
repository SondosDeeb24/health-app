"use strict";
//===========================================================================================================
//? Import 
//===========================================================================================================
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
exports.fetch_doctors = void 0;
const database_connection_1 = __importDefault(require("../database_connection"));
//===========================================================================================================
//? function to fetch all the doctors (optional criteria: by department)
//===========================================================================================================
const fetch_doctors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { dr_department } = req.params; // extract the department from the URL 
        let doctors = []; // declare the doctors array
        if (!dr_department) {
            [doctors] = yield database_connection_1.default.query("SELECT user_id , user_fullname FROM health_app.users WHERE user_role= ?", ['doctor']);
        }
        else {
            [doctors] = yield database_connection_1.default.query("SELECT user_id , user_fullname FROM health_app.users WHERE user_role= ? AND user_department= ?", ['doctor', dr_department]);
        }
        if (doctors.length == 0) {
            console.log("We have no doctors currently!");
            res.status(400).json({ message: "We have no doctors currently!" });
            return;
        }
        res.status(200).json(doctors);
        return;
    }
    catch (error) {
        console.log("Error while getting the doctors, try again please");
        res.status(400).json({ message: "Error while getting the doctors, try again please" });
        return;
    }
});
exports.fetch_doctors = fetch_doctors;
