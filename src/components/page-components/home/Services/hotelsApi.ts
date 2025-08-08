import { api } from "@/utils/api2";

export const hotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHotels: builder.query({
      query: ({ city, checkInDate, limit }) => ({
        url: "/hotels/search",
        method: "GET",
        params: { city, checkInDate, limit },
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetAllHotelsQuery } = hotelsApi;
