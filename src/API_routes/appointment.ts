//===========================================================================================================
// setting up express route
//===========================================================================================================

import express, { Router } from "express";

const router: Router = express.Router();

//===========================================================================================================
//Importing appointments functions
//===========================================================================================================

// Middlewares  for authentication and authorization
import { login_required } from "../middlewares/login_required";
import { authorize_role } from "../middlewares/authorize_role";


//Import controller functions for appointment routes
import { define_available_appointment } from "../controllers/appointments/define_available";

import { view_appointments } from "../controllers/appointments/view_booked";

import { view_available_appointments } from "../controllers/appointments/view_available";

//===========================================================================================================
//Router
//===========================================================================================================

//router to view booked appointments for every doctor
router.get('/doctor', login_required, authorize_role,  view_appointments );

//router to view available appointment for patient
router.get('/patient', login_required, view_available_appointments);

//?----------------------------------------------

//router to define available appointment by the doctor
router.post('/', login_required, authorize_role, define_available_appointment);

//===========================================================================================================

export default router;