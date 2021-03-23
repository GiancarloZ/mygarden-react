// API CONSTANTS

const BASE_URL = 'http://localhost:3001/api';
const HEROKU_URL = "https://gardenvy-node.herokuapp.com/api"
const SEEDS_URL = HEROKU_URL + '/seeds';
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
  fetch(SEEDS_URL, config)
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
  fetch(SEEDS_URL, config)
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