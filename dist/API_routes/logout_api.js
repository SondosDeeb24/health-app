"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===========================================================================================================
// Setting up Express router
//===========================================================================================================
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//===========================================================================================================
// Importing sign_in functoion
//===========================================================================================================
const logout_controller_1 = require("../controllers/logout_controller");
// Middlewares  for authentication 
const login_required_1 = require("../middlewares/login_required");
//===========================================================================================================
// Route to add new user to the system (Sign in )
//===========================================================================================================;
router.post('/', login_required_1.login_required, logout_controller_1.logout);
//===========================================================================================================
exports.default = router;
