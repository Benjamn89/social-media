import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

// import reducers
import logOnReducer from "./REDUCERS/LOG-PAGE/log-on-reducer";

// combined reducers
const rootReducer = combineReducers({
  logOnReducer,
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
