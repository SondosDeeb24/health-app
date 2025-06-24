"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===========================================================================================================
//? Import libraries 
//===========================================================================================================
const promise_1 = __importDefault(require("mysql2/promise")); // here I'm importing types for managing the Pool and the Pool connection from mysql2 promise-based API
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
//===========================================================================================================
//? create connection pool
//===========================================================================================================
const pool = promise_1.default.createPool({
    host: 'localhost',
    user: 'root',
    database: 'health_app',
    password: process.env.Database_Password,
    waitForConnections: true,
    connectionLimit: 10, // Allow multiple simultaneous connections
    queueLimit: 0
});
//===========================================================================================================
//? test the connection
//===========================================================================================================
pool.getConnection()
    .then((conn) => {
    console.log("Connected to MySQL successfully");
    conn.release(); // Return the connection to the pool so it become reusable
})
    .catch((error) => console.error("Error connecting to database:", error));
//===========================================================================================================
//? export the promise-based pool 
//===========================================================================================================
exports.default = pool;
