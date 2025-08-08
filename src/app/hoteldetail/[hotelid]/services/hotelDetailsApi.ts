import { api } from "@/utils/api2";

export const hotelDetailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotelsDetails: builder.query({
      query: ({ hotelId }) => ({
        url: `/hotels/${hotelId}`,
        method: "GET",
        // params: { search, limit },
      }),
    }),
    getHotelReviews: builder.query({
      query: ({ page, limit }) => ({
        url: `/reviews`,
        method: "GET",
        params: { page, limit },
      }),
    }),

    getHotelSlots: builder.query({
      query: ({ hotelId, checkInDate, duration, checkOutDate }) => ({
        url: `/hotels/${hotelId}/rooms`,
        method: "GET",
        params: {
          checkInDate,
          ...(checkOutDate && { checkOutDate }),
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHotelsDetailsQuery,
  useGetHotelReviewsQuery,
  useGetHotelSlotsQuery,
} = hotelDetailsApi;
