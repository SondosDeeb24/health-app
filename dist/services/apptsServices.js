"use strict";
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
exports.ApptServices = void 0;
//import enum for the valid apponitment status
const appointmentEnum_1 = require("../enums/appointmentEnum");
// import uuid (Universally Unique Identifier)
const uuid_1 = require("uuid");
//import helper to get the user data from the token
const get_token_data_1 = require("../helpers/get_token_data");
//import Models 
const appointmentsModel_1 = __importDefault(require("../models/appointmentsModel"));
const usersModel_1 = __importDefault(require("../models/usersModel"));
//===========================================================================================================
class ApptServices {
    //?============================================================================================================================================================
    //? define_available_appointment
    // function that allow doctors to sit available appointments. so users can book from them
    //============================================================================================================================================================
    defineAvailableAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const appointmentExists = yield appointmentsModel_1.default.findOne({
                    where: {
                        doctorID: doctor_id.user_id,
                        appointmentDate: new Date(appointment_date),
                        appointmentTime: appointment_time
                    },
                    raw: true // to get JS object rather thatn model instance
                });
                if (appointmentExists) {
                    console.log("Appointment is already added!");
                    res.status(208).json({ message: "Appointment is already added!" }); //208 status is already reported
                    return;
                }
                // construct appointment_id ---------------------------------------------------------------------------------------------------------------------
                // i'm using Universally Unique Identifires ( a 128-bit data object)
                let appointment_id = (0, uuid_1.v4)();
                // insert the data into the database --------------------------------------------------------------------------------------------------------------------
                const addAppointment = yield appointmentsModel_1.default.create({
                    appointmentID: appointment_id,
                    doctorID: doctor_id.user_id,
                    appointmentDate: new Date(appointment_date), // convert the string to date (becuase appointmentDate is expecting date datatype)
                    appointmentTime: appointment_time,
                    appointmentStatus: appointmentEnum_1.appointment_status.available
                });
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
    }
    //?============================================================================================================================================================
    //? view_appointments
    // function that provider users(patients) to view available appointment
    //============================================================================================================================================================
    viewAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                // let appointments_found: appointment_data[]  = [];
                if (!doctor_id) { // if no docotr specificed , get all the doctors from specific department in spcific date
                    appointments_found = yield appointmentsModel_1.default.findAll({
                        where: {
                            appointmentStatus: 'available',
                            appointmentDate: appointment_date
                        },
                        include: [{
                                model: usersModel_1.default,
                                as: 'doctor', //!
                                where: {
                                    userDepartment: department
                                },
                                attributes: ['userName', 'userGender']
                            }
                        ],
                        attributes: ['appointmentTime'],
                        raw: true
                    });
                }
                else { // when a specific doctor is choosed, get only his available appointments in spcific date
                    appointments_found = yield appointmentsModel_1.default.findAll({
                        where: {
                            appointmentStatus: 'available',
                            appointmentDate: appointment_date
                        },
                        include: [{
                                model: usersModel_1.default,
                                as: 'doctor', //!
                                where: {
                                    userDepartment: department,
                                    userID: doctor_id
                                },
                                attributes: [] // no need to view any data about the doctor , since the patient choosed the doctor
                            }
                        ],
                        attributes: ['appointmentTime'],
                        raw: true
                    });
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
    }
    //?============================================================================================================================================================
    //? view Booked Appointments
    // function used for fetch all booked appointments and show them to the doctor
    //============================================================================================================================================================
    viewBookedAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //----------------------------------------------------------------------
                // get the doctor data from the token 
                const user_data = (0, get_token_data_1.extract_token_data)(req, res);
                if (!user_data) { // when NO user_data found, we get null. in this case we have to stop the function ( no need to send response because  error message was already sent from extract_token_data function)
                    return;
                }
                //----------------------------------------------------------------------
                // fetch all booked appointment for the doctor
                const bookedAppointments = yield appointmentsModel_1.default.findAll({
                    where: {
                        appointmentStatus: 'booked',
                        doctorID: user_data.user_id
                    },
                    include: [{
                            model: usersModel_1.default,
                            as: 'patient',
                            attributes: ['userName']
                        }],
                    attributes: ['appointmentDate', 'appointmentTime']
                });
                if (bookedAppointments.length === 0) {
                    console.log('you have no appointments');
                    res.status(200).json({ message: 'you have no appointments' });
                    return;
                }
                //----------------------------------------------------------------------
                // if appointments found, display them to the doctor 
                console.log(bookedAppointments);
                res.status(200).json(bookedAppointments);
                return;
                //===========================================================================================================
            }
            catch (error) {
                console.log(`Error Occured while fetching the appointments. Error: ${error}`);
                res.status(400).json({ message: `Error Occured while fetching the appointments. Error: ${error}` });
            }
        });
    }
}
exports.ApptServices = ApptServices;
