//===========================================================================================
//? Initializes  Express framework & creates an instance of the Express application "app" & Import CORS
//(it will be used to define routes, middleware, and handle HTTP requests)
//===========================================================================================

import express, {Express} from 'express'; // importing express function and Express type

const app:Express = express();

import cors from 'cors';
//===========================================================================================
//? Import Middlewares & Libraries(modules) we will use
//===========================================================================================

import cookieParser from 'cookie-parser';//middleware for parsing cookies in Express requests
app.use(cookieParser());

//===========================================================================================
//? Enable CORS middleware
//===========================================================================================

app.use(cors());

//===========================================================================================
//? set up for the middleware( handle json reqestes & url & cookies)
//===========================================================================================

app.use(express.json()); // parse(analyse) incoming requestes with json type
app.use(express.urlencoded({ extended: true }));// parse(analyse) incoming body requests
app.use(cookieParser());// allow reading cookies

//===========================================================================================
//? Import the Routes
//===========================================================================================

import sign_in_route from './API_routes/sign_in_api';
import login_route from './API_routes/login_api';
import logout_route from './API_routes/logout_api';
import test from './API_routes/homepage_api';
//===========================================================================================
//? set up routes handler for the API endpoints
//===========================================================================================

app.use('/api/sign_in', sign_in_route);
app.use('/api/login', login_route);
app.use('/api/logout', logout_route);
app.use('/api/homepage', test);
//===========================================================================================

export default app;
