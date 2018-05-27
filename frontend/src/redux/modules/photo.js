import { actionCreators as userActions } from "redux/modules/user";

const initialState = {};

const SET_FEED = "SET_FEED";

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

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
    .then(json => {
      dispatch(setFeed(json));
    });
  };
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_FEED:
      return applySetFeed(state, action);

    default:
      return state;
  }
}

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  }
}

const actionCreators = {
  getFeed
};

export { actionCreators };

export default reducer;
