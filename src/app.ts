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

import auth from './API_routes/authRoute';

import appointment from './API_routes/apptRoute';

//===========================================================================================
//? set up routes handler for the API endpoints
//===========================================================================================

app.use('/api/auth', auth);
app.use('/api/appt', appointment);
//===========================================================================================

export default app;
