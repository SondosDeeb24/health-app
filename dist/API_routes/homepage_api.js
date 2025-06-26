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
const login_required_1 = require("../middlewares/login_required");
//===========================================================================================================
// Router
//===========================================================================================================
router.get('/', login_required_1.login_required, homepage_controller_1.test);
//===========================================================================================================
exports.default = router;
