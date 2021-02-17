// API CONSTANTS

const BASE_URL = 'http://localhost:8080/api';
const HEROKU_URL = ""
const PLANTS_URL = BASE_URL + '/plants';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const loadPlantAction = plantObj => ({
  type: 'LOAD_PLANTS',
  plant: plantObj
});

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const loadAllPlants = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(PLANTS_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadPlantAction(data));
     
    });
};

const newPlant = plantObj => dispatch => {
  console.log(plantObj)
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plantObj)
  };
  fetch(PLANTS_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(loadAllPlants);
    });
};
export default {
    loadAllPlants,
    newPlant,
  };