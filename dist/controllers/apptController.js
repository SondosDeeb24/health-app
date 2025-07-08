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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApptController = void 0;
//============================================================================================================================================================
//?importing 
//============================================================================================================================================================
const apptsServices_1 = require("../services/apptsServices");
const apptService = new apptsServices_1.ApptServices();
//============================================================================================================================================================
class ApptController {
    //============================================================================================================================================================
    // define available appointment(by doctor)
    // 
    //============================================================================================================================================================
    defineAvailableApppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return apptService.defineAvailableAppointments(req, res);
        });
    }
    //============================================================================================================================================================
    // view available appointments (by users)
    //============================================================================================================================================================
    viewAvailableAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return apptService.viewAppointments(req, res);
        });
    }
    //============================================================================================================================================================
    // view Booked Appointments (by doctor)
    //============================================================================================================================================================
    viewBookedAppointments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return apptService.viewBookedAppointments(req, res);
        });
    }
    //============================================================================================================================================================
    // Book Appointments (by patient)
    //============================================================================================================================================================
    bookApppointment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return apptService.bookAppointment(req, res);
        });
    }
}
exports.ApptController = ApptController;
