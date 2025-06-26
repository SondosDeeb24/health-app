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
const homepage_controller_1 = require("../controllers/homepage_controller");
const login_required_1 = require("../middlewares/login_required"); // function to to check authentication 
const authorize_role_1 = require("../middlewares/authorize_role"); // function to to check authorization 
//===========================================================================================================
// Router
//===========================================================================================================
router.get('/', login_required_1.login_required, authorize_role_1.authorize_role, homepage_controller_1.test);
//===========================================================================================================
exports.default = router;
