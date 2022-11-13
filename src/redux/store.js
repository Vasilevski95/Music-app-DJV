import { configureStore } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';

import { shazamCoreApi } from './services/shazamCore';
//And here we import shazamCoreApi

export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(shazamCoreApi.middleware),
});
//This is something that you do in every redux toolkit application, it is a boilerplate code that you can find in their documentation

//Simple setter function coming from reduxjs/toolkit, so if we follow the structure we need to create a services folder inside a redux folder

