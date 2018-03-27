import { createStore, combineReducers } from "redux";
import users from "redux/modules/users";

const reducer = combineReducers({
  users
});

const store = initialState => createStore(reducer);

export default store();
