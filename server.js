// The Express.js framework makes it very easy to develop an application which 
// can be used to handle multiple types of requests like the 
// GET, PUT, and POST and DELETE requests.
const express = require("express");
const app = express();

// 
// helmet => Helmet helps you secure your Express apps by setting various HTTP headers. 
const helmet = require("helmet");
app.use(helmet());

// dotenv For Managing Environments in node js
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({ path: envFile });

// Express middleware - cors
// enables cross-origin-resource-sharing for express apis
const cors = require("cors");
app.use(cors());

// Express middleware - body-parser
// body-parser extract the entire body portion of an incoming request stream 
// and exposes it on req.body
const bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" })); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true })); // support parsing of application/x-www-form-urlencoded post data

// Express middleware - express-useragent
// Express User Agent for getting Session Data
// exposing user-agent details to your application and views.
app.use(require('express-useragent').express())
let cookieParser = require('cookie-parser');

app.use(cookieParser());
// Routes (app.use('/', router-path))
app.use('/', require('./app/routes/route'));

app.use(express.static(__dirname + '/public'));

const path = require('path');
app.set('views',path.join(__dirname,'app/views'));
app.set('view engine', 'ejs');

// Response Handling
app.use(require("./app/helpers/response"));
 
// After your routes add a standard express error handler. This will be passed the Joi
// error, plus an extra "type" field so we can tell what type of validation failed
app.use(require("./app/helpers/error").handleJoiErrors);
 
// Error Handling
app.use(require("./app/helpers/error").handleErrors);

const logger = require("./app/loggers/logger")


// Process is a default property for fetching Environment Variables
const port = process.env.PORT || 3001;
app.listen(port, () => {
  // Listening to port
  logger.info(`Listening to Port :  ${port}`);
});
 