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
exports.UsersServices = void 0;
//import Enums
const userEnum_1 = require("../enums/userEnum");
//import User model
const usersModel_1 = __importDefault(require("../models/usersModel"));
//==========================================================================================================
class UsersServices {
    //?==========================================================================================================
    //? function to fetche all doctors
    //==========================================================================================================
    getDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { doctorDepartment } = req.params; // extract the department from the URL 
                let doctors = []; // declare the doctors array
                // fetch the doctors from the database
                if (!doctorDepartment) {
                    //fetch all the doctors in the database(regardless of the department)
                    doctors = yield usersModel_1.default.findAll({
                        where: {
                            userRole: userEnum_1.role.doctor
                        },
                        attributes: ['userID', 'userName']
                    });
                }
                else {
                    //fetch the all the doctors from a specific defined department
                    doctors = yield usersModel_1.default.findAll({
                        where: {
                            userRole: userEnum_1.role.doctor,
                            userDepartment: doctorDepartment
                        },
                        attributes: ['userID', 'userName']
                    });
                }
                if (doctors.length == 0) {
                    console.log("We have no doctors currently!");
                    res.status(400).json({ message: "We have no doctors currently!" });
                    return;
                }
                res.status(200).json(doctors);
                return;
                //---------------------------------------------------------------------------------------------------------------
            }
            catch (error) {
                console.log("Error while getting the doctors, try again please");
                res.status(400).json({ message: "Error while getting the doctors, try again please" });
                return;
            }
        });
    }
}
exports.UsersServices = UsersServices;
