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
exports.create_appointment = void 0;
const database_connection_1 = __importDefault(require("../../database_connection"));
// import uuid (Universally Unique Identifier)
const uuid_1 = require("uuid");
//===========================================================================================================
//? create new appointment
//===========================================================================================================
const create_appointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the values from the user ---------------------------------------------------------------------------------------------
        const body = req.body;
        let { patient_id, doctor_id, appointment_type, appointment_service, appointment_date, appointment_time, appointment_notes } = body;
        if (!patient_id || !doctor_id || !appointment_type || !appointment_service || !appointment_date || !appointment_time) {
            console.log('Fill all required fields to create appointment');
            res.status(400).json({ message: 'Fill all required fields to create appointment' });
            return;
        }
        if (!appointment_notes) {
            appointment_notes = "-";
        }
        // construct appointment_id ---------------------------------------------------------------------------------------------------------------------
        // i'm using Universally Unique Identifires ( a 128-bit data object)
        let appointment_id = (0, uuid_1.v4)();
        // insert the data into the database --------------------------------------------------------------------------------------------------------------------
        const [add_appointment] = yield database_connection_1.default.query("INSERT INTO health_app.appointments (appointment_id, patient_id, doctor_id, appointment_type, appointment_service, appointment_date, appointment_time, appointment_status, appointment_notes ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", [appointment_id, patient_id, doctor_id, appointment_type, appointment_service, appointment_date, appointment_time, "Pending", appointment_notes]);
        if (add_appointment.affectedRows == 0) {
            console.log('Databaes Error, Appointment was not reserved!');
            res.status(500).json({ message: 'Databaes Error, Appointment was not reserved!' });
            return;
        }
        console.log("Appointment was successfully reserved.");
        res.status(201).json({ message: "Appointment was successfully reserved." });
        return;
        //===========================================================================================================    
    }
    catch (error) {
        console.log(`Error while creating appointment. Error: ${error}`);
        res.status(400).json({ message: `Error while creating appointment.  Error: ${error}` });
        return;
    }
});
exports.create_appointment = create_appointment;
