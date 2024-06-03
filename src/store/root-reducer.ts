import { combineReducers } from "@reduxjs/toolkit";
import { apiService } from "./api-service";

const rootReducer = combineReducers({
  //   common: commonSlice,
  [apiService.reducerPath]: apiService.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
