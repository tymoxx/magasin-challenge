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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
