"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departments = exports.bloodTypes = exports.gender = exports.role = void 0;
//=================================
//? userRole 
//=================================
var role;
(function (role) {
    role["doctor"] = "doctor";
    role["patient"] = "patient";
})(role || (exports.role = role = {}));
//=================================
//? userGender 
//=================================
var gender;
(function (gender) {
    gender["male"] = "male";
    gender["female"] = "female";
})(gender || (exports.gender = gender = {}));
//=================================
//? userBloodType - optinal 
//=================================
var bloodTypes;
(function (bloodTypes) {
    bloodTypes["A_Pos"] = "A+";
    bloodTypes["A_Neg"] = "A-";
    bloodTypes["B_Pos"] = "B+";
    bloodTypes["B_Neg"] = "B-";
    bloodTypes["AB_Pos"] = "AB+";
    bloodTypes["AB_Neg"] = "AB-";
    bloodTypes["O_Pos"] = "O+";
    bloodTypes["O_Neg"] = "O-";
})(bloodTypes || (exports.bloodTypes = bloodTypes = {}));
//=================================
//? userDepartment  - optinal
//=================================
var departments;
(function (departments) {
    departments["Emergency"] = "Emergency";
    departments["Cardiology"] = "Cardiology";
    departments["Neurology"] = "Neurology";
    departments["Pediatrics"] = "Pediatrics";
    departments["Obstetrics_and_Gynecology"] = "Obstetrics and Gynecology";
    departments["Oncology"] = "Oncology";
    departments["Orthopedics"] = "Orthopedics";
    departments["Radiology"] = "Radiology";
    departments["Pathology"] = "Pathology";
    departments["GeneralSurgery"] = "General Surgery";
    departments["Urology"] = "Urology";
    departments["Dermatology"] = "Dermatology";
    departments["Gastroenterology"] = "Gastroenterology";
    departments["Nephrology"] = "Nephrology";
    departments["Pulmonology"] = "Pulmonology";
    departments["Psychiatry"] = "Psychiatry";
    departments["Endocrinology"] = "Endocrinology";
    departments["Rheumatology"] = "Rheumatology";
    departments["Intensive_Care_Unit"] = "Intensive Care Unit";
    departments["Infectious_Diseases"] = "Infectious Diseases";
    departments["Ophthalmology"] = "Ophthalmology";
    departments["Otorhinolaryngology"] = "Otorhinolaryngology";
    departments["Hematology"] = "Hematology";
    departments["Physical_Medicine_and_Rehab"] = "Physical Medicine and Rehab";
})(departments || (exports.departments = departments = {}));
