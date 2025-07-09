//===========================================================================================================
// setting up express route
//===========================================================================================================

import express, { Router } from "express";

const router: Router = express.Router();

//===========================================================================================================
// importing controller 
//===========================================================================================================

import { ReportsController } from "../controllers/reportController";
const reportsControler = new ReportsController();

import { login_required} from "../middlewares/login_required";
import { authorize_role } from "../middlewares/authorize_role";


//===========================================================================================================
// Router
//===========================================================================================================
router.post('/addReport', login_required, authorize_role, reportsControler.createReport);

//===========================================================================================================
export default router