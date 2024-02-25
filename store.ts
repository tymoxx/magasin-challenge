import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { launchesApi } from "@/services/launchesApi";
import { favouritesReducer } from "@/features/favourites/favouritesSlice";
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

const reducers = combineReducers({
    favourites: favouritesReducer,
    [launchesApi.reducerPath]: launchesApi.reducer,
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }).concat(launchesApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
