//===========================================================================================================
// Setting up Express router
//===========================================================================================================
import express, { Router } from 'express';

const router: Router = express.Router();

//===========================================================================================================
// Importing homepage function
//===========================================================================================================

// Middlewares  for authentication and authorization
import { login_required } from '../middlewares/login_required'; // function to to check authentication 
import { authorize_role } from "../middlewares/authorize_role";// function to to check authorization

//Import controller functions for homepage routes
import {test} from '../controllers/homepage_controller';

//===========================================================================================================
// Router
//===========================================================================================================

router.get('/', login_required, authorize_role, test)

//===========================================================================================================

export default router;