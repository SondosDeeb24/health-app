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
exports.view_available_appointments = void 0;
const database_connection_1 = __importDefault(require("../../database_connection"));
//===========================================================================================================
//? view the appointments 
// for "patient" it displays available appointments
//===========================================================================================================
const view_available_appointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // take data from the patient --------------------------------------------------------------------------------------------------
        const body = req.body;
        const { department, appointment_date, doctor_id } = body;
        if (!department || !appointment_date) {
            console.log('Fill all required fields');
            res.status(400).json({ message: 'Fill all required fields' });
            return;
        }
        // --------------------------------------------------------------------------------------------------
        //declare array to store available appointments 
        let appointments_found = [];
        if (!doctor_id) { // if no docotr specificed , get all the doctors from specific department in spcific date
            [appointments_found] = yield database_connection_1.default.query(`SELECT appointment_time, user_fullname, user_gender FROM health_app.appointments as app INNER JOIN health_app.users as user ON app.doctor_id = user.user_id  WHERE app.appointment_status = 'available' AND app.appointment_date = ? AND user.user_department = ?`, [appointment_date, department]);
        }
        else { // when a specific doctor is choosed, get only his available appointments in spcific date
            [appointments_found] = yield database_connection_1.default.query(`SELECT appointment_time FROM health_app.appointments AS app INNER JOIN health_app.users AS user ON app.doctor_id = user.user_id  WHERE app.appointment_status = 'available' AND app.appointment_date = ? AND user.user_department = ? AND  app.doctor_id = ?`, [appointment_date, department, doctor_id]);
        }
        if (appointments_found.length == 0) {
            console.log('No Available appointments Found');
            res.status(200).json({ message: 'No Available appointments Found' });
            return;
        }
        // --------------------------------------------------------------------------------------------------
        console.log(appointments_found);
        res.status(200).json(appointments_found);
        return;
        //===========================================================================================================
    }
    catch (error) {
        console.log(`Error Occured while fetching available appointments. Error: ${error}`);
        res.status(400).json({ message: `Error Occured while fetching available appointments. Error: ${error}` });
    }
});
exports.view_available_appointments = view_available_appointments;
