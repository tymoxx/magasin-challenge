import { configureStore } from '@reduxjs/toolkit'
import {launchesApi} from "@/services/launchesApi";
import {favouritesReducer} from "@/features/favourites/favouritesSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
    [launchesApi.reducerPath]: launchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(launchesApi.middleware)})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
