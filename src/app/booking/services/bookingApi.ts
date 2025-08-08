import { api } from "@/utils/api2";

export const bookingApi = api.injectEndpoints({
  endpoints: (builder) => ({
    makeBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    makeGuest: builder.mutation({
      query: (data) => ({
        url: "/guests",
        method: "POST",
        body: data,
      }),
    }),
    getBookings: builder.query({
      query: ({ page, limit }) => ({
        url: "/bookings",
        method: "GET",
        params: { page, limit },
      }),
      providesTags: ["booking"],
    }),

    cancelBooking: builder.mutation({
      query: ({ bookingId, reason }) => ({
        url: `/bookings/${bookingId}/cancel`,
        method: "POST",
        body: { reason },
      }),
      invalidatesTags: ["booking"],
    }),
    getBookingDetail: builder.query({
      query: ({ bookingId, email }) => ({
        url: `/bookings/${bookingId}/`,
        method: "GET",
        params: { email },
      }),
      providesTags: ["booking"],
    }),

    
    // bookings/6V6H9UY87U?email=jenish%40mailpro.live'
  }),
  overrideExisting: false,
});

export const {
  useMakeBookingMutation,
  useMakeGuestMutation,
  useGetBookingsQuery,
  useCancelBookingMutation,
  useGetBookingDetailQuery,
} = bookingApi;
