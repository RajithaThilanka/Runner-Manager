import { configureStore } from "@reduxjs/toolkit";
import { apiService } from "./api-service";
import navReducer from "../slices/nav-slice";

export const store = configureStore({
  reducer: {
    nav: navReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiService.middleware),
});
