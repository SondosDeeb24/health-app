"use strict";
//===========================================================================================
//? Initializes  Express framework & creates an instance of the Express application "app" & Import CORS
//(it will be used to define routes, middleware, and handle HTTP requests)
//===========================================================================================
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); // importing express function and Express type
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
//===========================================================================================
//? Import Middlewares & Libraries(modules) we will use
//===========================================================================================
const cookie_parser_1 = __importDefault(require("cookie-parser")); //middleware for parsing cookies in Express requests
app.use((0, cookie_parser_1.default)());
//===========================================================================================
//? Enable CORS middleware
//===========================================================================================
app.use((0, cors_1.default)());
//===========================================================================================
//? set up for the middleware( handle json reqestes & url & cookies)
//===========================================================================================
app.use(express_1.default.json()); // parse(analyse) incoming requestes with json type
app.use(express_1.default.urlencoded({ extended: true })); // parse(analyse) incoming body requests
app.use((0, cookie_parser_1.default)()); // allow reading cookies
//===========================================================================================
//? Import the Routes
//===========================================================================================
const authRoute_1 = __importDefault(require("./API_routes/authRoute"));
const apptRoute_1 = __importDefault(require("./API_routes/apptRoute"));
//===========================================================================================
//? set up routes handler for the API endpoints
//===========================================================================================
app.use('/api/auth', authRoute_1.default);
app.use('/api/appt', apptRoute_1.default);
//===========================================================================================
exports.default = app;
