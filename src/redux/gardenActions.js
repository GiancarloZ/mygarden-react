// API CONSTANTS

const BASE_URL = 'http://localhost:3000';
const HEROKU_URL = "https://skitchd-app-api.herokuapp.com"
const TRICKS_URL = BASE_URL + '/tricks';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const loadTrickAction = trickObj => ({
  type: 'LOAD_TRICKS',
  trick: trickObj
});

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const loadAllTricks = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(HEROKU_URL + '/tricks', config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadTrickAction(data));
     
    });
};

const newTrick = trickObj => dispatch => {
  console.log(trickObj)
  console.log('didididid')
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trickObj)
  };
  fetch(HEROKU_URL + '/tricks', config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(loadAllTricks);
      // localStorage.setItem('token', data.token);
    });
};
export default {
    loadAllTricks,
    newTrick,
  };