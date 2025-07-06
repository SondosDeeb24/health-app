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
// module.exports = {
//   async up(queryInterface: QueryInterface) { // runs the migration: applies the database changes. this function is called when 'sequelize db:migrate' is executed
//     await queryInterface.bulkInsert("Users", [ 
//       {
//         userID: 111,
//         userRole: 'doctor', 
//         userName: 'lily', 
//         userGender: 'female',
//         userAddress: 'gonyle',
//         userPhone: '+905298298',
//         userEmail: 'lily@gmail.com',
//         userBirthDate: '2002-05-17',
//         userDepartment: 'Cardiology',
//         userHashedPassword: 'lily'
//       },
//       {
//         userID: 333,
//         userRole: 'doctor', 
//         userName: 'david', 
//         userGender: 'male',
//         userAddress: 'gonyle',
//         userPhone: '+905298298',
//         userEmail: 'diaved@gmail.com',
//         userBirthDate: '2001-05-17',
//         userDepartment: 'Cardiology',
//         userHashedPassword: 'david'
//       },{
//         userID: 222,
//         userRole: 'patient', 
//         userName: 'lara', 
//         userGender: 'female',
//         userAddress: 'gonyle',
//         userPhone: '+905298298',
//         userEmail: 'lara@gmail.com',
//         userBirthDate: '2002-05-17',
//         userBloodType: 'A+',
//         userHashedPassword: 'lara'
//       },
//     ]);
//   },
//   async down(queryInterface: QueryInterface) { // reverts the migration: undoes the changes made by `up`. it's called when 'sequelize db:migrate:undo;
//     await queryInterface.bulkDelete("Users", {userID: [1234, 456, 789]}, {});
//     console.log("users was successfully reomved!")
//   },
// };
/**
 * Seeder file to populate the 'Users' table with initial data.
 */
exports.default = {
    // Runs when you execute: `npx sequelize-cli db:seed:all`
    //Inserts multiple user records into the 'Users' table.
    //@param queryInterface - Sequelize QueryInterface to interact with the DB.
    up(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkInsert("Users", [
                {
                    userID: 111,
                    userRole: 'doctor',
                    userName: 'lily',
                    userGender: 'female',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'lily@gmail.com',
                    userBirthDate: '2002-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: 'lily',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userID: 333,
                    userRole: 'doctor',
                    userName: 'david',
                    userGender: 'male',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'diaved@gmail.com',
                    userBirthDate: '2001-05-17',
                    userDepartment: 'Cardiology',
                    userHashedPassword: 'david',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
                {
                    userID: 222,
                    userRole: 'patient',
                    userName: 'lara',
                    userGender: 'female',
                    userAddress: 'gonyle',
                    userPhone: '+905298298',
                    userEmail: 'lara@gmail.com',
                    userBirthDate: '2002-05-17',
                    userBloodType: 'A+',
                    userHashedPassword: 'lara',
                    createdAt: new Date(),
                    updatedAt: new Date()
                },
            ]);
        });
    },
    // Runs when you execute: `npx sequelize-cli db:seed:undo`
    // Removes the inserted records from the 'Users' table based on userID.
    // @param queryInterface - Sequelize QueryInterface to interact with the DB.
    down(queryInterface) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryInterface.bulkDelete("Users", {
                userID: [111, 222, 333]
            });
            console.log("Inserted users have been successfully removed!");
        });
    }
};
