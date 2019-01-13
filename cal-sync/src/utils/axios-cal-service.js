const axios = require('axios');

const API_KEY = require('./apiKey');

function getCalendarList(token) {
  axios.get('https://www.googleapis.com/calendar/v3/users/me/calendarList', {
    params: {
      key: API_KEY,
      showDeleted: true
    },
    headers: {
      authorization: 'Bearer ya29.GmBKBmWb_FhBKICMnn9Ybj7_NGL135_P0FuivvN9dMu7XJl8u481_MqvkD0GVxvtYWAjRJcmOaNRfaLCzIqe0vClEGBM1ign3sr02pqp9ex89x93PirjsvxXNOQ_Kl85UOI'
    }
  }).then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  }).catch(console.error);
}

getCalendarList()
