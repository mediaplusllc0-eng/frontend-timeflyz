import { api } from "@/utils/api2";

export const hotelDetailsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getHotelsDetails: builder.query({
      query: (params) => ({
        url: `/hotels/${params.hotelId}`,
        method: "GET",
        params: params,
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
    getHotelRooms: builder.query({
      query: (params) => ({
        url: `/hotels/rates/room`,
        method: "Post",
        body: params,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetHotelsDetailsQuery,
  useGetHotelReviewsQuery,
  useGetHotelSlotsQuery,
  useGetHotelRoomsQuery,
} = hotelDetailsApi;
