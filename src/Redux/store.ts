import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Slices/userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import uiReducer from './Slices/uiSlice';
import testimonialsReducer from './Slices/testimonialSlice';
import { orthopedicSpineApi } from '../Api/orthopedicSpineApi';

export const store = configureStore({
  reducer: {
    [orthopedicSpineApi.reducerPath]: orthopedicSpineApi.reducer,
    user: userReducer,
    ui: uiReducer,
    testimonial: testimonialsReducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(orthopedicSpineApi.middleware),
  devTools: import.meta.env.MODE !== 'production', // Enable Redux DevTools only in development
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
