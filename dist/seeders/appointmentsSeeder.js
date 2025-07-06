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
            yield queryInterface.bulkInsert("appointments", [
                {
                    appointmentID: 'wrtywewe',
                    patientID: 666,
                    doctorID: 444,
                    appointmentDate: '2025-11-15',
                    appointmentTime: '09:30',
                    appointmentStatus: 'booked',
                },
                {
                    appointmentID: 'fh hwbhtr',
                    patientID: 666,
                    doctorID: 999,
                    appointmentDate: '2025-11-17',
                    appointmentTime: '08:30',
                    appointmentStatus: 'booked',
                },
                {
                    appointmentID: 'uopiopyilu',
                    doctorID: 444,
                    appointmentDate: '2025-11-14',
                    appointmentTime: '10:30',
                    appointmentStatus: 'available',
                },
            ]);
            console.log("appointment successfully inserted!");
        });
    },
    //---------------------------------------------------------------------------------------------------------------------------------
    // @param queryInterface - Sequelize QueryInterface to interact with the DB.
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("appointments", {
                appointmentID: ['wrtywewe']
            });
            console.log("appointment successfully removed!");
        });
    }
};
