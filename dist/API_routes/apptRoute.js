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
const apptController_1 = require("../controllers/apptController");
const apptController = new apptController_1.ApptController();
// Middlewares  for authentication and authorization
const login_required_1 = require("../middlewares/login_required");
const authorize_role_1 = require("../middlewares/authorize_role");
//===========================================================================================================
//Router
//===========================================================================================================
//router to define available appointment by the doctor
router.post('/', login_required_1.login_required, authorize_role_1.authorize_role, apptController.defineAvailableApppointments);
//?----------------------------------------------
//router to view booked appointments for every doctor
router.get('/doctor', login_required_1.login_required, authorize_role_1.authorize_role, apptController.viewBookedAppointments);
//router to view available appointment for patient
router.get('/patient', login_required_1.login_required, apptController.viewAvailableAppointments);
//===========================================================================================================
exports.default = router;
