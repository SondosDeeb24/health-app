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
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const sequelize_1 = require("sequelize");
//========================================================================
// create instance of Sequelize
const sequelize = new sequelize_1.Sequelize('health_app', 'root', process.env.Database_Password, {
    // host: 'localhost', // they are not important , mainly choosed by default like this
    // port: 3000,
    dialect: 'mysql'
});
//-------------------------------------------------------------------
// check the database connection by using authenticate() function
//both are correct and do the job
//using async / await
function myFunction() {
    return __awaiter(this, void 0, void 0, function* () {
        yield sequelize.authenticate();
        console.log("Connection Successful!");
    });
}
myFunction();
console.log('Another Task(await/async)');
// using then / catch
sequelize.authenticate().then(() => {
    console.log("Connection Successful!");
}).catch((error) => {
    console.log("Error in connecting to the database!");
});
console.log("Another task.(then/catch)");
