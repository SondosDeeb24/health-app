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
exports.ReportsController = void 0;
//import services class for reports
const reportsServices_1 = require("../services/reportsServices");
const reportsServices = new reportsServices_1.ReportsServices();
//==========================================================================================================
class ReportsController {
    //==========================================================================================================
    // functio to create reports 
    //==========================================================================================================
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return reportsServices.createReport(req, res);
        });
    }
    ;
}
exports.ReportsController = ReportsController;
