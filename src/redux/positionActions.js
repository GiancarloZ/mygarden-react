// API CONSTANTS

// const BASE_URL = 'http://localhost:3000';
// const ELEMENTS_URL = BASE_URL + '/elements';
// const PERSIST_URL = BASE_URL + '/persist';
// const LOGIN_URL = BASE_URL + '/login';
// const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

// const loadElementAction = elementObj => ({
//   type: 'LOAD_ELEMENTS',
//   element: elementObj
// });

// const clearUserAction = () => ({
//   type: 'CLEAR_USER'
// });

// Fetch

const setPosition = positionObj => ({
    type: 'SET_POSITION',
    position: positionObj
});

export default {
    setPosition,
  
  };