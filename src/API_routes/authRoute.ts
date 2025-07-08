//===========================================================================================================================
// setup Express route
//===========================================================================================================================
import express, { Router } from "express";

const router: Router = express.Router();

//===========================================================================================================================
//importing authentication functions
//===========================================================================================================================
import { AuthController } from "../controllers/authController";
const authController = new AuthController();

// Middlewares  for authentication 
import { login_required } from '../middlewares/login_required';

//===========================================================================================================================
// Router
//===========================================================================================================================

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout',login_required, authController.logout);

//===========================================================================================================
export default router;