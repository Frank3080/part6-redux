import { combineReducers, configureStore } from "@reduxjs/toolkit";
import anecdoteReducer from "./reducers/anecdoteReducer";
import filterReducer from "./reducers/filterReducer";
import notificationReducer from "./reducers/notificationReducer";

const mainReducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer,
  notification: notificationReducer,
});

const store = configureStore({
  reducer: mainReducer,
});

export default store;
