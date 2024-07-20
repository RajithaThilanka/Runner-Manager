import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./root-reducer";
import { runnerManagerApi } from "../api";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(runnerManagerApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
