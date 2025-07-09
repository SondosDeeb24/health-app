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
exports.ReportsServices = void 0;
//import helper function to extract data from JWT
const extractJWTData_1 = require("../helpers/extractJWTData");
// import uuid (Universally Unique Identifier)
const uuid_1 = require("uuid");
//import Report model(table)
const reportsModel_1 = __importDefault(require("../models/reportsModel"));
const appointmentsModel_1 = __importDefault(require("../models/appointmentsModel"));
//==========================================================================================================
class ReportsServices {
    //?==========================================================================================================
    //? functio to create reports 
    //==========================================================================================================
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const { appointmentID, diagnosis, description, systolicBloodPressure, diastolicBloodPressure, bloodSugar, temperature, userWeight, userHeight, medication, additionalComments } = body;
                if (!appointmentID || !diagnosis || !description || !systolicBloodPressure || !diastolicBloodPressure || !bloodSugar || !temperature || !userWeight || !userHeight || !medication) {
                    console.error('Fill all required fields');
                    res.status(500).json({ message: 'Fill all required fields' });
                    return;
                }
                ;
                //----------------------------------------------------------------------------------------------------------------------
                //check if a report already stored for this appointment
                const reportExists = yield reportsModel_1.default.findOne({
                    where: {
                        appointmentID: appointmentID
                    }
                });
                if (reportExists) {
                    console.log('Report Exists for this appointment');
                    res.status(422).json({ message: 'Report Exists for this appointment' });
                    return;
                }
                //----------------------------------------------------------------------------------------------------------------------
                //enusure the doctor is Authorized (he's creating report for his appointment)
                const userData = (0, extractJWTData_1.extractJWTData)(req, res);
                if (!userData) { // error message is sent from extractJWTData function
                    return;
                }
                //check that the appointment doctor is the same doctor trying to create the appointments
                const authorizeDoctor = yield appointmentsModel_1.default.findOne({
                    where: {
                        appointmentID: appointmentID,
                        doctorID: userData === null || userData === void 0 ? void 0 : userData.user_id
                    }
                });
                if (!authorizeDoctor) {
                    console.log('you are not authorized to create Report for this appointment');
                    res.status(401).json({ message: 'you are not authorized to create Report for this appointment' });
                    return;
                }
                //----------------------------------------------------------------------------------------------------------------------
                //create reportID
                const reportID = (0, uuid_1.v4)();
                //----------------------------------------------------------------------------------------------------------------------
                //insert report in Reports Table
                const addedReport = yield reportsModel_1.default.create({
                    appointmentID: appointmentID,
                    reportID: reportID,
                    diagnosis: diagnosis,
                    description: description,
                    systolicBloodPressure: systolicBloodPressure,
                    diastolicBloodPressure: diastolicBloodPressure,
                    bloodSugar: bloodSugar,
                    temperature: temperature,
                    userWeight: userWeight,
                    userHeight: userHeight,
                    medication: medication,
                    additionalComments: additionalComments || "", // use space string if no comments was provoided
                    reportGenerationDate: new Date(new Date().toDateString()),
                    reportGenerationTime: new Date().toTimeString().split(' ')[0]
                });
                console.log('report was successfully stored');
                res.status(200).json({ message: 'report was successfully stored' });
                return;
                //==========================================================================================================    
            }
            catch (error) {
                console.error('Error occured while creating report', error);
                res.status(500).json({ message: 'Error occured while creating report', error });
                return;
            }
        });
    }
}
exports.ReportsServices = ReportsServices;
