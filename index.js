const { google } = require('googleapis');
const { OAuth2 } = google.auth;


const oAuth2Client = new OAuth2('1046988474304-4e5ai4q7imr39cok3bhnsdnfcq7s2vb7.apps.googleusercontent.com', 'WIG5wV8MlLrBVh7kM0LG6i01')
oAuth2Client.setCredentials({ refresh_token: '1//04wDbzNBENnPRCgYIARAAGAQSNwF-L9Ir1UqPl7qZZFn5anCLNKl6ch_k99tNHf8Nha3UWjFNpWmaMHfyVyimffZ0pZoMGsA7ZZg' });

const calendar = google.calendar({ version: 'v3', auth: oAuth2Client });


const eventStartTime = new Date();

eventStartTime.setDate(eventStartTime.getDay() + 2);

const eventEndTime = new Date();
eventEndTime.setDate(eventEndTime.getDay() + 2);
eventEndTime.setMinutes(eventEndTime.getMinutes() + 45);

const event = {
    summary: 'Meeting with Sukh',
    location: '124 Atherton Ave,Ajax,ON,L1T0L2',
    description: 'Meeting with connected App and how to add the google calender api',
    start: {
        dateTime: eventStartTime,
        timeZone: 'America/Denver',
    },
    end: {
        dateTime: eventEndTime,
        timeZone: 'America/Denver'
    },
    colorId: 1
}

calendar.events.insert({calendarId:'primary',resource:event},err => {
    if (err) {
        console.error('Calender insert Faild ',err)
    }
    else {
        return console.log('Calender Event Created')
    }
});
// calendar.freebusy.query({
//     resource: {
//         timeMin : eventStartTime,
//         timeMax:eventEndTime,
//         timeZone : 'America/Denver',
//         items: [{id:'primary'}],
//     }
// }, (err, response) => {
//     if (err) {
//         console.err('Free Busy Query Error',err)
//     }
//     else {
//         const eventsArr = response.data.calendars.primary.busy;
//         if (eventsArr.length == 0) return calendar.events.insert({calendarId:'primary',resource:event},err => {
//             if (err) {
//                 console.error('Calender insert Faild ',err)
//             }
//             else {
//                 return console.log('Calender Event Created')
//             }
//         })
//         return console.log('Sorry I m busy');
//     }
// })