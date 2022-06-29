const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const GOOGLE_PROJECT_NUMBER = 979724780466
const GOOGLE_CALENDAR_ID = 'anvq7mro50oi6uvu2iu47g7q3c@group.calendar.google.com'
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
 function authorize(credentials, callback, body, res) {
    const {client_secret, client_id, redirect_uris} = credentials.web;
    const oAuth2Client = new google.auth.OAuth2(
        client_id, client_secret, redirect_uris[0]);
  
    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client, body, res);
    });
  }
  
  /**
   * Get and store new token after prompting for user authorization, and then
   * execute the given callback with the authorized OAuth2 client.
   * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
   * @param {getEventsCallback} callback The callback for the authorized client.
   */
  function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err, token) => {
        if (err) return console.error('Error retrieving access token', err);
        oAuth2Client.setCredentials(token);
        // Store the token to disk for later program executions
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log('Token stored to', TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }


/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth, body, res) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

const getEvents = async (req,res) =>{

// Load client secrets from a local file.
await fs.readFile('./secret.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    await authorize(JSON.parse(content), listEvents, req.body, res);
  });
  res.jsonp("Event successfully listed");
  
}

const createEvent = (auth, body,res) =>{
    const fechaEntrada=new Date(body.datos.fecha + " "+body.datos.horaEntrada)
    const fechaSalida=new Date(body.datos.fecha + " "+body.datos.horaSalida)
   
    const attendeesEmails = [
    { 'email': body.datos.email},
    ];
    const event = {
    summary: 'Cita por video Llamada',
    // location: 'Google Meet',
    // description: 'Learn how to code with Javascript',
    start: {
        dateTime: fechaEntrada,
        // timeZone: 'America/Los_Angeles',
    },
    end: {
        dateTime: fechaSalida,
        // timeZone: 'America/Los_Angeles',
    },
    attendees: attendeesEmails,
    reminders: {
        useDefault: false,
        overrides: [
        { method: 'email', 'minutes': 24 * 60 },
        { method: 'popup', 'minutes': 10 },
        ],
    },
    "conferenceData": {
        "createRequest": {
            "conferenceSolutionKey": { "type": "hangoutsMeet" },
            "requestId": body.datos.id
        }
        }
    }
        const calendar = google.calendar({version: 'v3', auth});
    	calendar.events.insert({
    	// auth:a,
    	calendarId: GOOGLE_CALENDAR_ID,
    	resource: event,
        sendUpdates:'all',
        conferenceDataVersion: 1
    	}, function(err, event) {
    	if (err) {
    		console.log('There was an error contacting the Calendar service: ' + err);
    		return;
    	}
    	console.log('Event created: %s', event.data);
    	
        res.jsonp("Event successfully created!");
    })
    }

const createMeet = async (req,res) =>{
console.log(req.body)

// Load client secrets from a local file.
await  fs.readFile('./secret.json', async (err, content) => {
    if (err) return console.log('Error loading client secret file:', err);
    // Authorize a client with credentials, then call the Google Calendar API.
    await authorize(JSON.parse(content), createEvent, req.body, res);
   
});
 
}


module.exports = {
  getEvents,

  createMeet
}

