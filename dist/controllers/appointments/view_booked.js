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
exports.view_appointments = void 0;
const database_connection_1 = __importDefault(require("../../database_connection"));
// import a helper function to extract user data from the token
const get_token_data_1 = require("../../helpers/get_token_data");
//===========================================================================================================
//? view all the appointments 
// for "doctor" it displays booked appointemnt 
//===========================================================================================================
const view_appointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //----------------------------------------------------------------------
        // get the doctor data from the token 
        const user_data = (0, get_token_data_1.extract_token_data)(req, res);
        if (!user_data) { // when NO user_data found, we get null. in this case we have to stop the function ( no need to send response because  error message was already sent from extract_token_data function)
            return;
        }
        //----------------------------------------------------------------------
        // fetch all booked appointment for the doctor
        const [appointments_found] = yield database_connection_1.default.query(`SELECT DATE_FORMAT(appointment_date, '%Y-%m-%d') AS appointment_date, appointment_time, patient_id FROM health_app.appointments WHERE doctor_id = ${user_data.user_id} AND appointment_status = 'booked' `);
        // if doctor has no appointments, then stop the funciton 
        if (appointments_found.length == 0) {
            console.log('you have no appointments');
            res.status(200).json({ message: 'you have no appointments' });
            return;
        }
        //----------------------------------------------------------------------
        // add the patient_fullname(user_fullanme) property to every object (booked appointment) in appointments_found array
        for (let i = 0; i < appointments_found.length; i++) {
            const patient_id = appointments_found[i].patient_id;
            const [patient_name] = yield database_connection_1.default.query("SELECT user_fullname FROM health_app.users WHERE user_id = ?", [patient_id]);
            if (patient_name.length == 0) {
                console.log('Sorry, no user file found for this patient');
                res.status(200).json({ message: 'Sorry, no user file found for this patient' });
                return;
            }
            appointments_found[i].patient_fullname = patient_name[i].user_fullname;
        }
        //----------------------------------------------------------------------
        // if appointments found, display it to the doctor 
        console.log(appointments_found);
        res.status(200).json(appointments_found);
        return;
        //===========================================================================================================
    }
    catch (error) {
        console.log(`Error Occured while fetching the appointments. Error: ${error}`);
        res.status(400).json({ message: `Error Occured while fetching the appointments. Error: ${error}` });
    }
});
exports.view_appointments = view_appointments;
