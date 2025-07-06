"use strict";
//========================================================================
//? Importing
//========================================================================
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
const databaseConnection_1 = __importDefault(require("../databaseConnection"));
const userEnum_1 = require("../enums/userEnum");
const sequelize_1 = require("sequelize");
//========================================================================
//? Define table using sequelize
//========================================================================
const User = databaseConnection_1.default.define('users', {
    userID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    userRole: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.role)) // take enum object(role) and return array of its value.
        //  the(...) is speart operator, to speard the array vlaues in ENUM()
    },
    userName: {
        type: sequelize_1.DataTypes.STRING(30)
    },
    userGender: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.gender))
    },
    userAddress: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    userPhone: {
        type: sequelize_1.DataTypes.STRING(50)
    },
    userEmail: {
        type: sequelize_1.DataTypes.STRING(50)
    }, userBirthDate: {
        type: sequelize_1.DataTypes.DATE
    }, userBloodType: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.bloodTypes))
    }, userDepartment: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(userEnum_1.departments))
    }, userHashedPassword: {
        type: sequelize_1.DataTypes.STRING(100)
    }
});
//========================================================================
//? insert the table in the database using sync()
//========================================================================
function insertTable() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield User.sync({ force: true });
            console.log("users Table and model synced successfully");
            const user1 = User.build({ userID: 123, userRole: "doctor", userName: "Lily", userGender: "female", userAddress: "gonyle", userPhone: "+90000", userEmail: "slf@dfj.com", userBirthDate: " 2025-02-12", userDepartment: "Cardiology", userHashedPassword: "lily" });
            user1.userEmail = 'lily@gmail.com';
            return user1.save();
        }
        catch (error) {
            console.log("Error in syncing  users table and model ", error);
        }
    });
}
insertTable();
