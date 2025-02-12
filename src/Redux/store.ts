import { configureStore } from "@reduxjs/toolkit";
import { backendServiceApi } from "./api";
import userReducer from "./Slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import uiReducer from "./Slices/uiSlice";

export const store = configureStore({
  reducer: {
    [backendServiceApi.reducerPath]: backendServiceApi.reducer,
    user: userReducer,
    ui: uiReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendServiceApi.middleware),
  devTools: import.meta.env.MODE !== "production", // Enable Redux DevTools only in development
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
