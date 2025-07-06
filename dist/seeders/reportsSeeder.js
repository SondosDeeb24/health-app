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
                    reportID: 'njsrthaetgerg',
                    appointmentID: 'wrtywewe',
                    diagnosis: 'Hypertension Stage 1',
                    description: 'Patient reported dizziness and headache.',
                    bloodPressure: '135/85',
                    bloodSugar: '120 mg/dL',
                    temperature: 37.5,
                    userWeight: 70,
                    userHeight: 175,
                    medication: 'Atenolol 50mg daily',
                    additionalComments: 'Follow-up recommended in 2 weeks.',
                    reportGenerationDate: new Date(),
                    reportGenerationTime: '09:30'
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
