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
// Importing login function
//===========================================================================================================
const login_required_1 = require("../middlewares/login_required"); // function to to check authentication 
const authorize_role_1 = require("../middlewares/authorize_role"); // function to to check authorization 
const fetch_doctors_1 = require("../controllers/fetch_doctors");
//===========================================================================================================
// Router
//===========================================================================================================
router.get('/', login_required_1.login_required, authorize_role_1.authorize_role, fetch_doctors_1.fetch_doctors);
router.get('/:dr_department', login_required_1.login_required, authorize_role_1.authorize_role, fetch_doctors_1.fetch_doctors);
//===========================================================================================================
exports.default = router;
