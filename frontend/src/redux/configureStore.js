import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import users from "redux/modules/users";

const NODE_ENV = process.env.NODE_ENV;

const middlewares = [thunk];

if (NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  users
});

const store = initialState => createStore(reducer, applyMiddleware(...middlewares));

export default store();
