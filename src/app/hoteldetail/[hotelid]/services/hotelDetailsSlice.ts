import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Slot {
  id: string;
  startTime: string;
  endTime: string;
  price: number;
  // Add more fields as needed
}

interface HotelState {
  selectedHotelId: string | null;
  selectedSlot: Slot | null;
}

const initialState: HotelState = {
  selectedHotelId: null,
  selectedSlot: null,
};

export const hotelSlice = createSlice({
  name: "hotelDetails",
  initialState,
  reducers: {
    setSelectedHotelId(state, action: PayloadAction<string>) {
      state.selectedHotelId = action.payload;
    },
    clearSelectedHotelId(state) {
      state.selectedHotelId = null;
    },
    setSelectedSlot(state, action: PayloadAction<Slot>) {
      state.selectedSlot = action.payload;
    },
    clearSelectedSlot(state) {
      state.selectedSlot = null;
    },
  },
});

export const {
  setSelectedHotelId,
  clearSelectedHotelId,
  setSelectedSlot,
  clearSelectedSlot,
} = hotelSlice.actions;

export default hotelSlice.reducer;
