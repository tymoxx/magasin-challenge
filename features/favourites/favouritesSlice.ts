import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavouritesState {
    favourites: string[];
}

const initialState: FavouritesState = {
    favourites: [],
};

export const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        addFavourite: (state, action: PayloadAction<string>) => {
            if (!state.favourites.includes(action.payload)) {
                state.favourites.push(action.payload);
            }
        },
        removeFavourite: (state, action: PayloadAction<string>) => {
            state.favourites = state.favourites.filter(flightNumber => flightNumber !== action.payload);
        },
    },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export const favouritesReducer = favouritesSlice.reducer;

