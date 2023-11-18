'use client'

import { configureStore } from '@reduxjs/toolkit'
import { adminSlice } from './adminSlice'
import { carsApi } from './services/carsApi';
import { userSlice } from './userSlice';
import { setupListeners } from '@reduxjs/toolkit/query';

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    user: userSlice.reducer,
    [carsApi.reducerPath]: carsApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([carsApi.middleware]),
});

setupListeners(store.dispatch);
