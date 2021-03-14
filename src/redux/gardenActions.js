// API CONSTANTS

const BASE_URL = 'http://localhost:8080/api';
const HEROKU_URL = "https://gardenvy-node.herokuapp.com/api"
const GARDENS_URL = HEROKU_URL + '/gardens';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const loadGardenAction = gardenObj => ({
  type: 'LOAD_GARDENS',
  garden: gardenObj
});

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const loadAllGardens = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(GARDENS_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadGardenAction(data));
     
    });
};

const newGarden = gardenObj => dispatch => {
  console.log(gardenObj)
  console.log('didididid')
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(gardenObj)
  };
  fetch(GARDENS_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(loadAllGardens);
    });
};
export default {
    loadAllGardens,
    newGarden,
  };