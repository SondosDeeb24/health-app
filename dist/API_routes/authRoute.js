"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===========================================================================================================================
// setup Express route
//===========================================================================================================================
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//===========================================================================================================================
//importing authentication functions
//===========================================================================================================================
const authController_1 = require("../controllers/authController");
const authController = new authController_1.AuthController();
// Middlewares  for authentication 
const login_required_1 = require("../middlewares/login_required");
//===========================================================================================================================
// Router
//===========================================================================================================================
router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/logout', login_required_1.login_required, authController.logout);
//===========================================================================================================
exports.default = router;
