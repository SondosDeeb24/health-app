"use strict";
//===========================================================================================================
// setting up express route
//===========================================================================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
//===========================================================================================================
//Importing the controller class
//===========================================================================================================
const userController_1 = require("../controllers/userController");
const usersController = new userController_1.UserController();
//===========================================================================================================
//Router
//===========================================================================================================
router.get('/viewDoctors', usersController.getDoctors);
router.get('/viewDoctors/:doctorDepartment', usersController.getDoctors);
//===========================================================================================================
exports.default = router;
