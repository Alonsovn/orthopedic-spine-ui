import { configureStore } from "@reduxjs/toolkit";
import { backendServiceApi } from "./api";
import { userSlice } from "./Slices/userSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [backendServiceApi.reducerPath]: backendServiceApi.reducer,
    user: userSlice.reducer,
  },

  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(backendServiceApi.middleware),
});

setupListeners(store.dispatch);
