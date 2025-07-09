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
// importing controller 
//===========================================================================================================
const reportController_1 = require("../controllers/reportController");
const reportsControler = new reportController_1.ReportsController();
const login_required_1 = require("../middlewares/login_required");
const authorize_role_1 = require("../middlewares/authorize_role");
//===========================================================================================================
// Router
//===========================================================================================================
router.post('/addReport', login_required_1.login_required, authorize_role_1.authorize_role, reportsControler.createReport);
//===========================================================================================================
exports.default = router;
