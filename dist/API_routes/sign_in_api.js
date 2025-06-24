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
const middleware_handler_1 = require("../middleware_handler");
//===========================================================================================================
// Importing sign_in functoion
//===========================================================================================================
const sign_in_controller_1 = require("../controllers/sign_in_controller");
//===========================================================================================================
// Route to add new user to the system (Sign in )
//===========================================================================================================;
router.post('/', (0, middleware_handler_1.async_handler)(sign_in_controller_1.sign_in));
//===========================================================================================================
exports.default = router;
