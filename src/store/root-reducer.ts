import { combineReducers } from "@reduxjs/toolkit";
import navSlice from "../slices/nav-slice";
import authReducer from "../auth/authReducer";
import { runnerManagerApi } from "../api";

const rootReducer = combineReducers({
  nav: navSlice,
  auth: authReducer,
  [runnerManagerApi.reducerPath]: runnerManagerApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
