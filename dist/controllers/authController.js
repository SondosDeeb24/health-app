"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
//============================================================================================================================================================
//?importing 
//============================================================================================================================================================
const authServices_1 = require("../services/authServices");
const authServices = new authServices_1.AuthServices();
//============================================================================================================================================================
class AuthController {
    // =================================================================================================================================
    // Sign Up function 
    //=================================================================================================================================
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return authServices.signUp(req, res);
        });
    }
    //=================================================================================================================================
    // Login function
    // =================================================================================================================================
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return authServices.login(req, res);
        });
    }
    //=================================================================================================================================
    // Logout function
    // =================================================================================================================================
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return authServices.logout(req, res);
        });
    }
}
exports.AuthController = AuthController;
