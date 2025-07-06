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
//===================================================================================================================================
// this seeder file populate the 'Users' table with initial data
exports.default = {
    //@param queryInterface - is Sequelize QueryInterface to interact with the DB
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("Users", [
                {
                    userID: 999,
                    userRole: 'doctor',
                    userName: 'john',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'john@gmail.com',
                    userBirthDate: '2002-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: 'john'
                    // createdAt: new Date(),
                    // updatedAt: new Date()
                },
                {
                    userID: 444,
                    userRole: 'doctor',
                    userName: 'mona',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'mona@gmail.com',
                    userBirthDate: '2001-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: 'mona'
                    // createdAt: new Date(),
                    // updatedAt: new Date()
                },
                {
                    userID: 666,
                    userRole: 'patient',
                    userName: 'paria',
                    userGender: 'female',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'paria@gmail.com',
                    userBirthDate: '2002-05-17',
                    userBloodType: 'A+',
                    userHashedPassword: 'paria'
                    // createdAt: new Date(),
                    // updatedAt: new Date()
                },
            ]);
        });
    },
    //---------------------------------------------------------------------------------------------------------------------------------
    // @param queryInterface - Sequelize QueryInterface to interact with the DB.
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("Users", {
                userID: [444, 666, 999]
            });
            console.log("Inserted users have been successfully removed!");
        });
    }
};
