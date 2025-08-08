// store/slices/bookingSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { bookingApi } from "./bookingApi";

interface BookingState {
  selectedBookingId: string | null;
  showBookingModal: boolean;
  cancelledBookings: string[];
  guestData: any | null;
}

const initialState: BookingState = {
  selectedBookingId: null,
  showBookingModal: false,
  cancelledBookings: [],
  guestData: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setSelectedBookingId(state, action: PayloadAction<string | null>) {
      state.selectedBookingId = action.payload;
    },
    toggleBookingModal(state, action: PayloadAction<boolean>) {
      state.showBookingModal = action.payload;
    },
    setGuestData(state, action: PayloadAction<any>) {
      state.guestData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      bookingApi.endpoints.cancelBooking.matchFulfilled,
      (state, action) => {
        const cancelledId = action.meta.arg.originalArgs.bookingId;
        if (!state.cancelledBookings.includes(cancelledId)) {
          state.cancelledBookings.push(cancelledId);
        }
      }
    );
  },
});

export const { setSelectedBookingId, toggleBookingModal, setGuestData } =
  bookingSlice.actions;
export default bookingSlice.reducer;
