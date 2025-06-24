"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//===========================================================================================================
//? Import Required Modules and Set Port:
//===========================================================================================================
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const port = 3000;
//===========================================================================================================
//? Create HTTP Server and Initialize Express App:
//===========================================================================================================
const server = http_1.default.createServer(app_1.default); //method to creates an HTTP server and passes Express app to handle incoming requests.
//===========================================================================================================
server.listen(port);
