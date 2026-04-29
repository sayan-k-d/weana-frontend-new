// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./slices/authSlice";
// import uiReducer from "./slices/uiSlice";

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     ui: uiReducer,
//   },
// });

// // types (important for TS)
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import { baseApi } from '@/services/baseApi';

export const store = configureStore({
  reducer: {
    // Feature slices
    auth: authReducer,
    ui: uiReducer,

    // RTK Query - single api reducer for all endpoints
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;