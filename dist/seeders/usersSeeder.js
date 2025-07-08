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
                    userID: 52097494,
                    userRole: 'doctor',
                    userName: 'john chalopen',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'john@gmail.com',
                    userBirthDate: '2002-05-17',
                    userDepartment: 'Emergency',
                    userHashedPassword: '$2b$08$hLLXN.Sd9ezYwW.KoM/goOp0ghEBFB7tHjnm7gNsfenu92pXCukzm'
                },
                {
                    userID: 60085985,
                    userRole: 'doctor',
                    userName: 'nicole sabby',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'nicole@gmail.com',
                    userBirthDate: '2001-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: '$2b$08$ugCEs8i/ejeL8YNdmplH1O7dtUmzyIr4GCNfzdtWZZ8iCJ.l8YKJq'
                },
                {
                    userID: 12547898,
                    userRole: 'doctor',
                    userName: 'tiana antonaole',
                    userGender: 'female',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'tiana@gmail.com',
                    userBirthDate: '2002-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: '$2b$08$y9irsv4cSLs6f4CCvjsVPOkMNPoSr7qdqobI38vWYSjvKf.LoBKYi'
                },
                {
                    userID: 42413365,
                    userRole: 'patient',
                    userName: 'lara',
                    userGender: 'female',
                    userAddress: 'gonyle',
                    userPhone: '+90457764',
                    userEmail: 'lara@gmail.com',
                    userBirthDate: '2000-02-22',
                    userBloodType: 'A+',
                    userHashedPassword: '$2b$08$JePJLlEfYvCICwJCFAm1cu8oDcQjaX0NuWdCRgqJdchWFz3BByH8u'
                },
                {
                    userID: 65985412,
                    userRole: 'patient',
                    userName: 'morgan ferman',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+90457764',
                    userEmail: 'morgan@gmail.com',
                    userBirthDate: '2001-02-22',
                    userBloodType: 'B+',
                    userHashedPassword: '$2b$08$82oHl4rDBlRcRFTw65lVxOll6HL8UZY0pQXQGSAD69fW/KFTj9K8S'
                },
            ]);
        });
    },
    //---------------------------------------------------------------------------------------------------------------------------------
    // @param queryInterface - Sequelize QueryInterface to interact with the DB.
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("Users", {
                userID: [63831988, 444, 666, 999] //[52097494, 60085985, 22192181, 42413365, 52097494]
            });
            console.log("Inserted users have been successfully removed!");
        });
    }
};
