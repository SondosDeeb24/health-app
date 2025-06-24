//===========================================================================================================
//? Import libraries 
//===========================================================================================================
import mysql, { Pool, PoolConnection } from 'mysql2/promise'; // here I'm importing types for managing the Pool and the Pool connection from mysql2 promise-based API

import path from 'path';
import dotenv from 'dotenv';

// __dirname points to the folder where our folder "dist/" located, we need to go outside it to the project root folder and find .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });
//===========================================================================================================
//? create connection pool
//===========================================================================================================
const pool: Pool = mysql.createPool({ // this pool support async/await because we imported the promise-based pool in the firts place
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
    .then((conn: PoolConnection) => {
        console.log("Connected to MySQL successfully");
        conn.release(); // Return the connection to the pool so it become reusable
    })
    .catch((error: Error) => console.error("Error connecting to database:", error));

//===========================================================================================================
//? export the promise-based pool 
//===========================================================================================================

export default pool;
