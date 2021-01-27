// API CONSTANTS

const BASE_URL = 'http://localhost:8080/api';
const HEROKU_URL = ""
const SEEDS_URL = BASE_URL + '/seeds';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const loadSeedAction = seedObj => ({
  type: 'LOAD_SEEDS',
  seed: seedObj
});

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const loadAllSeeds = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(BASE_URL + '/seeds', config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadSeedAction(data));
     
    });
};

const newSeed = seedObj => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(seedObj)
  };
  fetch(BASE_URL + '/seeds', config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(loadAllSeeds);
      // localStorage.setItem('token', data.token);
    });
};
export default {
    loadAllSeeds,
    newSeed,
  };