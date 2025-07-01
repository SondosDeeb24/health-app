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
exports.define_available_appointment = void 0;
const database_connection_1 = __importDefault(require("../../database_connection"));
// import uuid (Universally Unique Identifier)
const uuid_1 = require("uuid");
//import helper to get the user data from the token
const get_token_data_1 = require("../../helpers/get_token_data");
//import enum for the valid apponitment status
const define_available_appointments_1 = require("../../enums/define_available_appointments");
//===========================================================================================================
//? create new appointment
//===========================================================================================================
const define_available_appointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the values from the user ---------------------------------------------------------------------------------------------
        const body = req.body;
        let { appointment_date, appointment_time } = body;
        if (!appointment_date || !appointment_time) {
            console.log('Fill all required fields to create appointment');
            res.status(400).json({ message: 'Fill all required fields to create appointment' });
            return;
        }
        const doctor_id = (0, get_token_data_1.extract_token_data)(req, res);
        if (!doctor_id) { //if no tokent data found stop the operation. (json response is send from extract_token_data function)
            return;
        }
        //-------------------------------------------------------------------------------------------------------------------------------
        //check if a available appointment was alreayd added to that doctor at the same time for the specified date
        const [appointment_exists] = yield database_connection_1.default.query("SELECT * FROM health_app.appointments WHERE appointment_date = ? AND appointment_time = ?  AND doctor_id = ? ", [appointment_date, appointment_time, doctor_id.user_id]);
        if (appointment_exists.length !== 0) {
            console.log("Appointment is already added!");
            res.status(208).json({ message: "Appointment is already added!" }); //208 status is already reported
            return;
        }
        // construct appointment_id ---------------------------------------------------------------------------------------------------------------------
        // i'm using Universally Unique Identifires ( a 128-bit data object)
        let appointment_id = (0, uuid_1.v4)();
        // insert the data into the database --------------------------------------------------------------------------------------------------------------------
        const [add_appointment] = yield database_connection_1.default.query("INSERT INTO health_app.appointments (appointment_id, doctor_id, appointment_date, appointment_time, appointment_status) VALUES (?, ?, ?, ?, ?)", [appointment_id, doctor_id.user_id, appointment_date, appointment_time, define_available_appointments_1.appointment_status.available]);
        if (add_appointment.affectedRows == 0) {
            console.log('Databaes Error, Appointment was not reserved!');
            res.status(500).json({ message: 'Databaes Error, Appointment was not reserved!' });
            return;
        }
        console.log("Available Appointment was successfully defined.");
        res.status(201).json({ message: "Available Appointment was successfully defined." });
        return;
        //===========================================================================================================    
    }
    catch (error) {
        console.log(`Error while defining appointment. ${error}`);
        res.status(400).json({ message: `Error while defining appointment. ${error}` });
        return;
    }
});
exports.define_available_appointment = define_available_appointment;
