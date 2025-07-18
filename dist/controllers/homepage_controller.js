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
exports.test = void 0;
// import a helper function to extract user data from the token
const extractJWTData_1 = require("../helpers/extractJWTData");
//===========================================================================================================
//
//===========================================================================================================
// temp func (it will be updated soon!)
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = (0, extractJWTData_1.extract_token_data)(req, res);
    if (!user) {
        return;
    }
    console.log(`welcome ${user.user_fullname}`);
    res.status(201).json({ message: `welcome ${user === null || user === void 0 ? void 0 : user.user_fullname}` });
    return;
});
exports.test = test;
