"use strict";
//===========================================================================================================
// setting up express route
//===========================================================================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//===========================================================================================================
//Importing appointments functions
//===========================================================================================================
// Middlewares  for authentication and authorization
const login_required_1 = require("../middlewares/login_required");
const authorize_role_1 = require("../middlewares/authorize_role");
//Import controller functions for appointment routes
const define_available_1 = require("../controllers/appointments/define_available");
const view_booked_1 = require("../controllers/appointments/view_booked");
const view_available_1 = require("../controllers/appointments/view_available");
//===========================================================================================================
//Router
//===========================================================================================================
//router to view booked appointments for every doctor
router.get('/doctor', login_required_1.login_required, authorize_role_1.authorize_role, view_booked_1.view_appointments);
//router to view available appointment for patient
router.get('/patient', login_required_1.login_required, view_available_1.view_available_appointments);
//?----------------------------------------------
//router to define available appointment by the doctor
router.post('/', login_required_1.login_required, authorize_role_1.authorize_role, define_available_1.define_available_appointment);
//===========================================================================================================
exports.default = router;
