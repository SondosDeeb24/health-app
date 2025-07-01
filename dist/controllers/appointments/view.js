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
const get_token_data_1 = require("../../helpers/get_token_data");
//===========================================================================================================
//? view all the appointments 
// for "doctor" it displays booked appointemnt 
//===========================================================================================================
const view_appointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_data = (0, get_token_data_1.extract_token_data)(req, res);
        if (!user_data) { // when NO user_data found, we get null. in this case we have to stop the function ( no need to send response because  error message was already sent from extract_token_data function)
            return;
        }
        // const user_role = user_data.user_role;
        const [appointments_found] = yield database_connection_1.default.query(`SELECT * FROM health_app.appointments WHERE doctor_id = ?`, [user_data.user_id]);
        if (appointments_found.length == 0) {
            console.log('you have no appointments');
            res.status(204).json({ message: 'you have no appointments' });
            return;
        }
        for (let i = 0; i < appointments_found.length; i++) {
            appointments_found[i].appointment_date = new Date(appointments_found[i].appointment_date).toISOString().slice(0, 10); //so we display the date in this fomrat"YYYY-MM-DD" , rather a long format with the zone details
        }
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
