//===========================================================================================================
// Setting up Express router
//===========================================================================================================
import express, { Router } from 'express';

const router: Router = express.Router();

//===========================================================================================================
// Importing login function
//===========================================================================================================

import {test} from '../controllers/homepage_controller';

import { login_required } from '../middlewares/login_required'; // function to to check authentication 
import { authorize_role } from "../middlewares/authorize_role";// function to to check authorization 

//===========================================================================================================
// Router
//===========================================================================================================

router.get('/', login_required, authorize_role, test)

//===========================================================================================================

export default router;