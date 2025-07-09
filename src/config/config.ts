// ========================================================================
// ? Importing
// ========================================================================
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

module.exports = {
    development: {
        username:"root",
        password: process.env.DATABASE_PASSWORD ,
        database: "hospital_system",
        host: "localhost",
        port:  3306,
        dialect: "mysql",
    }
}

