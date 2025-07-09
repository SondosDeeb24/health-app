//===========================================================================================================
// setting up express route
//===========================================================================================================

import express, { Router } from "express";

const router: Router = express.Router();

//===========================================================================================================
//Importing appointments functions
//===========================================================================================================
import { ApptController } from "../controllers/apptController";
const apptController = new ApptController();

// Middlewares  for authentication and authorization
import { login_required } from "../middlewares/login_required";
import { authorize_role } from "../middlewares/authorize_role";

//===========================================================================================================
//Router
//===========================================================================================================

//router to define available appointment (by doctor)
router.post('/', login_required, authorize_role, apptController.defineAvailableApppointments);

//?----------------------------------------------

//router to view booked appointments (by doctor)
router.get('/doctor', login_required, authorize_role,  apptController.viewBookedAppointments );

//router to view available appointment (by patient)
router.get('/patient', login_required, apptController.viewAvailableAppointments);

//?----------------------------------------------

//route to book appointment (by patient)
router.patch('/bookAppt', login_required, apptController.bookApppointment);
router.patch('/bookAppt/:doctorDepartment', login_required, apptController.bookApppointment);
//===========================================================================================================

export default router;