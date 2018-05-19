import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { i18nState } from "redux-i18n";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "redux/modules/user";
import photo from "redux/modules/photo";
// import Reactotron from "ReactotronConfig"; // not used

const NODE_ENV = process.env.NODE_ENV;

const history = createHistory();
const middlewares = [thunk, routerMiddleware(history)];

if (NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const reducer = combineReducers({
  user,
  photo,
  routing: routerReducer,
  i18nState
});

let store;
if (NODE_ENV === "development") { // development
  store = initialState =>
    // Reactotron.createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
    createStore(reducer, composeWithDevTools(applyMiddleware(...middlewares)));
} else { // production
  store = initialState =>
    createStore(reducer, applyMiddleware(...middlewares));
}

export {history};
export default store();
