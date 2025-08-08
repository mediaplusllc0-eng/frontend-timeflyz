import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelState {
  selectedCountry: string;
  currentPage: number;
  itemsPerPage: number;
}

const initialState: HotelState = {
  selectedCountry: "sydney",
  currentPage: 1,
  itemsPerPage: 4,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
      state.currentPage = 1; // reset page
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSelectedCountry, setCurrentPage } = hotelsSlice.actions;
export default hotelsSlice.reducer;
