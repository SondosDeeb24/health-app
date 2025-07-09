//========================================================================
//? Importing
//========================================================================
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { Sequelize } from "sequelize";

//========================================================================
//? create instance of Sequelize
//========================================================================
const sequelize = new Sequelize('hospital_system', 'root', process.env.Database_Password, {
    host: 'localhost', // they are not important , mainly choosed by default like this
    port: 3306,
    dialect: 'mysql'

});

//========================================================================
//? testing the database connection 
//========================================================================
const testingDatabaseConnection = ()=>{
    try{
        sequelize.authenticate();
        console.log('connected to MySQL successfully');
    }catch(error){
        console.error('Error occured while connection the database');
    }
};

testingDatabaseConnection();

//========================================================================
export default sequelize;

