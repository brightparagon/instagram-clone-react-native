// initial state for user reducer
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false
}

// actions
const SAVE_TOKEN = "SAVE_TOKEN";

// action creators
function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

// API actions
function facebookLogin(access_token) {
  return dispatch => {
    fetch("/users/login/facebook/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        access_token
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
      }
    })
    .catch(error => console.error(error));
  }
}

function usernameLogin(username, password) {
  return function(dispatch) {
    fetch("/rest-auth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
      }
    })
    .catch(error => console.log(error));
  };
}

function createAccount(username, password, email) {
  return function(dispatch) {
    fetch("/rest-auth/registration/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password1: password,
        password2: password,
        email
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token) {
        dispatch(saveToken(json.token));
      }
    })
    .catch(error => console.log(error));
  };
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    default:
      return state;
  }
}

// reducer functions
function applySetToken(state, action) {
  const { token } = action;
  localStorage.setItem("jwt", token);
  return {
    ...state,
    isLoggedIn: true,
    token
  };
}

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount
};

export { actionCreators };

export default reducer;
