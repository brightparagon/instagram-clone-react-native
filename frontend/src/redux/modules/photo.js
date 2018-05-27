import { actionCreators as userActions } from "redux/modules/user";

const initialState = {};

const SET_FEED = "SET_FEED";
const LIKE_PHOTO = "LIKE_PHOTO";
const UNLIKE_PHOTO = "UNLIKE_PHOTO";

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function doLikePhoto(photoId) {
  return {
    type: LIKE_PHOTO,
    photoId
  };
}

function doUnlikePhoto(photoId) {
  return {
    type: UNLIKE_PHOTO,
    photoId
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

function likePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doLikePhoto(photoId)); // optimistic update
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401) {
        dispatch(userActions.logout());
      } else if(!response.ok) {
        dispatch(doUnlikePhoto(photoId));
      }
    })
  };
}

function unlikePhoto(photoId) {
  return (dispatch, getState) => {
    dispatch(doUnlikePhoto(photoId)); // optimistic update
    const { user: { token } } = getState();
    fetch(`/images/${photoId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    .then(response => {
      if(response.status === 401) {
        dispatch(userActions.logout());
      } else if(!response.ok) {
        dispatch(doLikePhoto(photoId));
      }
    })
  };
}

// reducer
function reducer(state = initialState, action) {
  switch(action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    
    case LIKE_PHOTO:
      return applyLikePhoto(state, action);
    
    case UNLIKE_PHOTO:
      return applyUnlikePhoto(state, action);

    default:
      return state;
  }
}

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applyLikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if(photo.id === photoId) {
      return {...photo, is_liked: true, like_count: photo.like_count + 1};
    }
    return photo;
  });

  return {...state, feed: updatedFeed};
}

function applyUnlikePhoto(state, action) {
  const { photoId } = action;
  const { feed } = state;
  const updatedFeed = feed.map(photo => {
    if(photo.id === photoId) {
      return {...photo, is_liked: false, like_count: photo.like_count - 1};
    }
    return photo;
  });

  return {...state, feed: updatedFeed};
}

const actionCreators = {
  getFeed,
  likePhoto,
  unlikePhoto
};

export { actionCreators };

export default reducer;
