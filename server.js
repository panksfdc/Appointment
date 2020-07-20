#!/usr/bin/env node

/**
 * Module dependencies.
 */

let debug = require('debug')('comp307-lesson3:server');
let http = require('http');
let bodyParser = require('body-parser')

let express = require("express");
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Get port from environment and store in Express.
 */

let port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}



app.listen(4000, () => {
  console.log("Server running on port 3000");
});

app.post("/url", (req, res, next) => {

  const { google } = require('googleapis');
  const { OAuth2 } = google.auth;

  console.log(req.body.refreshToken);
  const oAuth2Client = new OAuth2(req.body.clientKey, req.body.apiKey)
  oAuth2Client.setCredentials({ refresh_token: req.body.refreshToken });

  const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });


  let startDate = req.body.startDate;
  let startTime = req.body.startTime;
  let googleStartTime = (startDate + 'T' + startTime).split('.000Z')[0] + '-04:00';
  let googleEndTime = (req.body.startDate + 'T' + req.body.endTime).split('.000Z')[0] + '-04:00';
  console.log(googleStartTime)
  const event = {
    summary: req.body.summary,
    description: req.body.description,
    start: {
      dateTime: googleStartTime,
      timeZone: 'America/Toronto',
    },
    end: {
      dateTime: googleEndTime,
      timeZone: 'America/Toronto'
    },
    colorId: 1,
    attendees: [
      { 'email': req.body.attendee }
    ]
  }

  calendar.events.insert({ calendarId: 'primary', resource: event }, err => {
    if (err) {
      res.json({ "Message": "Calender Invitation Not Sent" });
    }
    else {
      res.json({ "Message": "Calender Invitation Sent" });
    }
  });

 
})