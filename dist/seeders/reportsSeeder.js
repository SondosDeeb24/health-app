"use strict";
// ====================================================================================================================================
//? Import
// ====================================================================================================================================
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
//====================================================================================================================================
exports.default = {
    //@param queryInterface - is Sequelize QueryInterface to interact with the DB
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("reports", [
                {
                    reportID: "62f5dda1-c518-4c2c-a4a8-3cebe4d572ad",
                    appointmentID: "ea95bf2d-f1c2-4075-bc80-69d88c8ca35c",
                    diagnosis: "Hypertension and mild arrhythmia",
                    description: "Patient presented with intermittent chest discomfort, dizziness, and palpitations over the past two weeks.",
                    systolicBloodPressure: 110,
                    diastolicBloodPressure: 75,
                    bloodSugar: 102,
                    temperature: 36.8,
                    userWeight: 82,
                    userHeight: 175,
                    medication: "Atenolol 50mg once daily, Lisinopril 10mg once daily",
                    additionalComments: "",
                    reportGenerationDate: new Date(),
                    reportGenerationTime: '09:30'
                },
                {
                    reportID: "7bbc9399-1272-4810-b39a-1b22a9ccd4ef",
                    appointmentID: "ead745ea-cc3a-4439-b5dc-1b3b6a159b1c",
                    diagnosis: "Hypertension Stage 1",
                    description: "Patient reported dizziness and headache.",
                    systolicBloodPressure: 120,
                    diastolicBloodPressure: 80,
                    bloodSugar: 120,
                    temperature: 37.5,
                    userWeight: 70,
                    userHeight: 175,
                    medication: "Atenolol 50mg daily",
                    additionalComments: "Follow-up recommended in 2 weeks.",
                    reportGenerationDate: new Date(),
                    reportGenerationTime: "12:30"
                },
            ]);
            console.log("reports  successfully inserted!");
        });
    },
    //---------------------------------------------------------------------------------------------------------------------------------
    // @param queryInterface - Sequelize QueryInterface to interact with the DB.
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("reports", {
                reportID: ['njsrthaetgerg']
            });
            console.log("reports successfully removed!");
        });
    }
};
