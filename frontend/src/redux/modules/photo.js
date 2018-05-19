const initialState = {};

function getFeed() {
  return (dispatch, getState) => {
    const { user: { token } } = getState();
    fetch("/images/", {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => response.json())
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
