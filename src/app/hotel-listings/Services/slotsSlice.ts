import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HotelUIState {
  selectedCity: string | null;
}

const initialState: HotelUIState = {
  selectedCity: null,
};

const hotelSlice = createSlice({
  name: "slotsList",
  initialState,
  reducers: {
    setSelectedCity(state, action: PayloadAction<string | null>) {
      state.selectedCity = action.payload;
    },
  },
});

export const { setSelectedCity } = hotelSlice.actions;
export default hotelSlice.reducer;
