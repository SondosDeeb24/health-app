"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ========================================================================
// ? Importing
// ========================================================================
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
module.exports = {
    development: {
        username: "root",
        password: process.env.DATABASE_PASSWORD,
        database: "hospital_system",
        host: "localhost",
        port: 3306,
        dialect: "mysql",
    }
};
