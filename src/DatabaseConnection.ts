//========================================================================
//? Importing
//========================================================================
import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import { Sequelize } from "sequelize";

//========================================================================

// create instance of Sequelize
const sequelize = new Sequelize('hospital_system', 'root', process.env.Database_Password, {
    host: 'localhost', // they are not important , mainly choosed by default like this
    port: 3306,
    dialect: 'mysql'

});
//========================================================================
export default sequelize;

