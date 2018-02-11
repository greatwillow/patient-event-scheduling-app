import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./appReducer";

//REDUX PERSIST CONFIG
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["selectedDate", "modalUI"]
};

const persistedReducer = persistReducer(persistConfig, appReducer);

let store = createStore(
  persistedReducer,
  undefined,
  compose(applyMiddleware(thunk, logger))
);

let persistor = persistStore(store);

//purge() Is used to purge the Redux store between app sessions
//if purge() is ommitted, the state of the app will be persisted
//through sessions

//persistor.purge();

export { store, persistor };
