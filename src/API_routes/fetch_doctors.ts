//===========================================================================================================
// Setting up Express router
//===========================================================================================================
import express, { Router } from 'express';

const router: Router = express.Router();

//===========================================================================================================
// Importing login function
//===========================================================================================================


import { login_required } from '../middlewares/login_required'; // function to to check authentication 
import { authorize_role } from "../middlewares/authorize_role";// function to to check authorization 
import {fetch_doctors } from '../controllers/fetch_doctors';
//===========================================================================================================
// Router
//===========================================================================================================

router.get('/', login_required, authorize_role, fetch_doctors)
router.get('/:dr_department', login_required, authorize_role, fetch_doctors)

//===========================================================================================================

export default router;