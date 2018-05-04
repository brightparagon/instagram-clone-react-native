const initialState = {
  isLoggedIn: localStorage.getItem("jwt") || false
}

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
    .then(json => console.log(json))
    .catch(error => console.error(error));
  }
}

function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

const actionCreators = {
  facebookLogin
};

export { actionCreators };

export default reducer;
