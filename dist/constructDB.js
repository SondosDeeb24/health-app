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
//==============================================================================================
//? importing
//==============================================================================================
const DatabaseConnection_1 = __importDefault(require("./DatabaseConnection"));
// running the models for thier side-effects(for them to be added in sequelize.model )
require("./models/usersModel");
require("./models/appointmentsModel");
require("./models/reportsModel");
//==============================================================================================
//? control all the table( build them or drop them)
//==============================================================================================
try {
    const buildModel = () => __awaiter(void 0, void 0, void 0, function* () {
        //build all the tables
        yield DatabaseConnection_1.default.sync({ alter: true }); //this line looks at all the models I imported (e.x:  import './models/usersModel' etc) then it creates or alters the tables based on your model definitions
        console.log('Report Model constructured successfully');
        //drop all the schema
        // await sequelize.drop();
        // console.log('Schema(database) was dropped successfully')
    });
    buildModel();
}
catch (error) {
    console.log('Error occured: ', error);
}
