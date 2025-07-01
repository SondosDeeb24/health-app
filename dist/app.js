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
const sign_in_api_1 = __importDefault(require("./API_routes/sign_in_api"));
const login_api_1 = __importDefault(require("./API_routes/login_api"));
const logout_api_1 = __importDefault(require("./API_routes/logout_api"));
const homepage_api_1 = __importDefault(require("./API_routes/homepage_api"));
const fetch_doctors_1 = __importDefault(require("./API_routes/fetch_doctors"));
const appointment_1 = __importDefault(require("./API_routes/appointment"));
//===========================================================================================
//? set up routes handler for the API endpoints
//===========================================================================================
app.use('/api/sign_in', sign_in_api_1.default);
app.use('/api/login', login_api_1.default);
app.use('/api/logout', logout_api_1.default);
app.use('/api/homepage', homepage_api_1.default);
app.use('/api/view_doctors', fetch_doctors_1.default);
app.use('/api/appointment', appointment_1.default);
//===========================================================================================
exports.default = app;
