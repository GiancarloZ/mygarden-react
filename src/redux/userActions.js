// API CONSTANTS

const BASE_URL = 'http://localhost:3001/api';
const HEROKU_URL = "https://gardenvy-node.herokuapp.com/api"
const USERS_URL = HEROKU_URL + '/users';
const PERSIST_URL = HEROKU_URL + '/auth';
const SIGNIN_URL = HEROKU_URL + '/signin';
const SIGNUP_URL =  HEROKU_URL + '/signup';
const SPECIFIC_USER_URL = id => USERS_URL + '/' + id;

// Redux Actions

const setUserAction = userObj => ({
  type: 'SET_USER',
  user: userObj
});

const clearUserAction = () => ({
  type: 'CLEAR_USER'
});

const loadUserAction = userObj => ({
  type: 'LOAD_USERS',
  user: userObj
});

// Fetch

const loadAllUsers = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  };
  fetch(USERS_URL, config)
    .then(r => r.json())
    .then(data => {
        console.log(data)
      dispatch(loadUserAction(data));
     
    });
};

const newUserToDB = userObj => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  };
  fetch(SIGNUP_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      dispatch(setUserAction(data.user));
      localStorage.setItem('token', data.token);
    })
    .catch(err => {
        console.log(err)
    });
};

const loginUserToDB = userCredentials => dispatch => {
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userCredentials)
  };
  fetch(SIGNIN_URL, config)
    .then(r => r.json())
    .then(data => {
      console.log(data)
      if (data.user){
        dispatch(setUserAction(data.user));
        localStorage.setItem('token', data.token);
        return data.user
      } else {
        return "Login Failed!"
      }
    })
    .catch(err => {
      console.log(err)
    });
};

const persistUser = () => dispatch => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: `bearer ` + localStorage.token
    }
  };
  fetch(PERSIST_URL, config)
    .then(r => r.json())
    .then(userInstance => {
      console.log(userInstance)
      dispatch(setUserAction(userInstance));
    });
};

const logoutUser = () => dispatch => {
  console.log("logout")
  dispatch(clearUserAction());
  localStorage.clear();
};

const deleteUserFromDB = userId => dispatch => {
  const config = {
    method: 'DELETE'
  };
  fetch(SPECIFIC_USER_URL(userId), config).then(r => {
    dispatch(clearUserAction());
    localStorage.clear();
  });
};
export default {
  loadAllUsers,
  newUserToDB,
  deleteUserFromDB,
  loginUserToDB,
  persistUser,
  logoutUser
};