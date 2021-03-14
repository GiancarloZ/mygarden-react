// API CONSTANTS

const BASE_URL = 'http://localhost:8080/api';
const HEROKU_URL = "https://gardenvy-node.herokuapp.com"
const PLANT_IMAGES_URL = HEROKU_URL + '/plantimages';


// Redux Actions

const loadPlantImageAction = plantImageObj => ({
  type: 'LOAD_PLANT_IMAGES',
  plantImage: plantImageObj
});

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const loadAllPlantImages = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(PLANT_IMAGES_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadPlantImageAction(data));
    });
};

const newPlantImage = plantImageObj => dispatch => {
  console.log(plantImageObj)
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plantImageObj)
  };
  fetch(PLANT_IMAGES_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(loadAllPlantImages);
    });
};
export default {
    loadAllPlantImages,
    newPlantImage,
  };