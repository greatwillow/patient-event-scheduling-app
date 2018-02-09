import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import appReducer from "./appReducer";

const configureStore = createStore(
  appReducer,
  undefined,
  compose(applyMiddleware(thunk, logger))
);

export default configureStore;
