import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// import reducers
import logOnReducer from "./REDUCERS/00-LOG-PAGE/log-on-reducer";
import NavbarReducer from "./REDUCERS/01-NAVBAR/navbar-reducer";
import PostsReducer from "./REDUCERS/02-HOME-PAGE/00-POSTS-BOX/posts-box-reducer";
import ProfileBoxReducer from "./REDUCERS/02-HOME-PAGE/01-PROFILE-BOX/profile-box-reducer";

// combined reducers
const rootReducer = combineReducers({
  logOnReducer,
  NavbarReducer,
  PostsReducer,
  ProfileBoxReducer,
});

// create logger for thunk
const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      return result;
    };
  };
};

// create store - redux
const store = createStore(rootReducer, applyMiddleware(logger, thunk));

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
