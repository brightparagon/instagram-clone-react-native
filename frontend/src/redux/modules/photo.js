import { actionCreators as userActions } from "redux/modules/user";

const initialState = {};

function getFeed() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/images/", {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401) {
        // if django server responded with 401 status dispatch logout action
        dispatch(userActions.logout());
      }
      return response.json();
    })
    .then(json => console.log(json))
  }
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}

const actionCreators = {
  getFeed
};

export { actionCreators };

export default reducer;
