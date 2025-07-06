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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//======================================================================================================================
//?  Imports
//======================================================================================================================
const sequelize_1 = require("sequelize");
const DatabaseConnection_1 = __importDefault(require("../DatabaseConnection"));
const userEnum_1 = require("../enums/userEnum");
//==============================================================================================================================================
//? Model class
//==============================================================================================================================================
class User extends sequelize_1.Model {
    ;
}
//======================================================================================================================
//? Initialize the table
//======================================================================================================================
User.init({
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.role)),
        allowNull: false
    },
    userName: { type: sequelize_1.DataTypes.STRING(30),
        allowNull: false
    },
    userGender: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.gender)),
        allowNull: false
    },
    userAddress: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    userPhone: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    userEmail: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false
    },
    userBirthDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    userBloodType: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.bloodTypes))
    },
    userDepartment: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.departments))
    },
    userHashedPassword: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    }
}, {
    sequelize: DatabaseConnection_1.default, // to attach the User model to the database connection i've defined in databaseConnection.ts
    tableName: 'users',
    timestamps: false, // it creates  createdAt / updatedAt columns
});
// !!!!-------------------------------------------------------------------------------------------------------------------------
//====================================================================================================================================
//? function for building the table and adding one user
//======================================================================================================================================
function insertTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield User.sync({ alter: true }); // adding the new table, if a table already exists in DB, we drop it then add the new one
            console.log('users Table and model synced successfully');
            //-------------------------------------------------------------------------------------
            // add new user to the system 
            const user1 = yield User.bulkCreate([
                {
                    userID: 123,
                    userRole: 'doctor',
                    userName: 'Lily',
                    userGender: 'female',
                    userAddress: 'Gonyle',
                    userPhone: '+90000',
                    userEmail: 'slf@dfj.com',
                    userBirthDate: new Date('2025-02-12'),
                    userDepartment: "Cardiology",
                    userHashedPassword: 'lily'
                },
                {
                    userID: 963,
                    userRole: 'patient',
                    userName: 'Sara',
                    userGender: 'female',
                    userAddress: 'Gonyle',
                    userPhone: '+90000',
                    userEmail: 'sara@dfj.com',
                    userBloodType: userEnum_1.bloodTypes.B_Neg,
                    userBirthDate: new Date('2002-02-12'),
                    userHashedPassword: 'Sara'
                }
            ]);
            //=============================================================================
        }
        catch (error) {
            console.error('Error syncing users table:', error);
        }
    });
}
//======================================================================================================================================
// call the function to build the table and add user
// insertTable();
//======================================================================================================================================
function showUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const rows = yield User.min('userID');
        console.log(rows); // ← now you’ll see real values
    });
}
//======================================================================================================================================
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield insertTable(); // Ensure table is created and data inserted
        yield showUsers(); // Now you can safely read from it
    });
}
main(); // ← run both in correct order
//======================================================================================================================================
exports.default = User;
