//===========================================================================================================
// Setting up Express router
//===========================================================================================================
import express, { Router } from 'express';

const router: Router = express.Router();

//===========================================================================================================
// Importing login function
//===========================================================================================================

// Middlewares  for authentication and authorization
import { login_required } from '../middlewares/login_required'; // function to to check authentication 
import { authorize_role } from "../middlewares/authorize_role";// function to to check authorization 

//Import controller functions for viewing the doctors routes
import {fetch_doctors } from '../controllers/fetch_doctors';
//===========================================================================================================
// Router
//===========================================================================================================

router.get('/', login_required, fetch_doctors)
router.get('/:dr_department', login_required,  fetch_doctors)

//===========================================================================================================

export default router;