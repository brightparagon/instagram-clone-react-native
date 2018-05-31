// initial state for user reducer
const initialState = {
  isLoggedIn: localStorage.getItem("jwt") ? true : false,
  token: localStorage.getItem("jwt") // if not exist it's null
};

// actions
const SAVE_TOKEN = "SAVE_TOKEN";
const LOGOUT = "LOGOUT"; // remove token in browser local storage
const FOLLOW_USER = "FOLLOW_USER";
const UNFOLLOW_USER = "UNFOLLOW_USER";
const SET_EXPLORE = "SET_EXPLORE";

// action creators
function saveToken(token) {
  return {
    type: SAVE_TOKEN,
    token
  };
}

function logout() {
  return {
    type: LOGOUT
  };
}

function setFollowUser(userId) {
  return {
    type: FOLLOW_USER,
    userId
  };
}

function setUnfollowUser(userId) {
  return {
    type: UNFOLLOW_USER,
    userId
  };
}

function setExplore(userList) {
  return {
    type: SET_EXPLORE,
    userList
  };
}

// API actions
function facebookLogin(access_token) {
  return (dispatch) => {
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

function followUser(userId) {
  return (dispatch, getState) => {
    dispatch(setFollowUser(userId));
    const { user: { token } } = getState();
    fetch(`/users/${userId}/follow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setUnfollowUser(userId));
      }
    });
  };
}

function unfollowUser(userId) {
  return (dispatch, getState) => {
    dispatch(setUnfollowUser(userId));
    const { user: { token } } = getState();
    fetch(`/users/${userId}/unfollow/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(logout());
      } else if (!response.ok) {
        dispatch(setFollowUser(userId));
      }
    });
  };
}

function getExplore() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/users/explore/", {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.status === 401) {
        dispatch(logout());
      }
      return response.json();
    })
    .then(json => dispatch(setExplore(json)));
  };
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case SAVE_TOKEN:
      return applySetToken(state, action);
    
    case LOGOUT:
      return applyLogout(state, action);

    case FOLLOW_USER:
      return applyFollowUser(state, action);

    case UNFOLLOW_USER:
      return applyUnfollowUser(state, action);

    case SET_EXPLORE:
      return applySetExplore(state, action);

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

function applyLogout(state, action) {
  localStorage.removeItem("jwt");
  return {
    isLoggedIn: false
  };
}

function applyFollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map((user) => {
    if(user.id === userId) {
      return { ...user, following: true };
    }
    return user;
  });

  return {...state, userList: updatedUserList};
}

function applyUnfollowUser(state, action) {
  const { userId } = action;
  const { userList } = state;
  const updatedUserList = userList.map((user) => {
    if(user.id === userId) {
      return { ...user, following: false };
    }
    return user;
  });

  return {...state, userList: updatedUserList};
}

function applySetExplore(state, action) {
    const { userList } = action;
    return {
      ...state,
      userList
    };
  }

const actionCreators = {
  facebookLogin,
  usernameLogin,
  createAccount,
  logout,
  followUser,
  unfollowUser,
  getExplore
};

export { actionCreators };

export default reducer;
