import { configureStore } from '@reduxjs/toolkit'
import {launchesReducer} from "@/features/launches/launchesSlice";
import {launchesApi} from "@/src/services/launchesApi";

export const store = configureStore({
  reducer: {
    launches: launchesReducer,
    [launchesApi.reducerPath]: launchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(launchesApi.middleware)})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
