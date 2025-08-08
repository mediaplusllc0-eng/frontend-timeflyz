// src/store/slices/favoritesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoritesState {
  items: string[];
  guestItems: string[]; // <-- for guests
  // or you can use a more complex structure like: FavoriteItem[]
}

const initialState: FavoritesState = {
  items: [],
  guestItems: [], // <-- for guests
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.items = action.payload;
    },
    setGuestFavorites: (state, action) => {
      state.guestItems = action.payload;
    },
    addFavorite: (state, action: PayloadAction<string>) => {
      if (!state.items.includes(action.payload)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((id) => id !== action.payload);
    },
    clearFavorites: (state) => {
      state.items = [];
    },
  },
});

export const {
  setGuestFavorites,
  setFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
} = favoritesSlice.actions;

export default favoritesSlice.reducer;
