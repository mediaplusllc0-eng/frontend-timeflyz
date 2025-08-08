import { api } from "@/utils/api2";

export const favoritesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateFavorite: builder.mutation({
      query: ({ customerId, action, body }) => ({
        url: `/customers/${customerId}/favorites/${action}`,
        method: "POST",
        body,
      }),
    }),
    getFavoriteList: builder.query({
      query: ({ customerId }) => ({
        url: `/customers/${customerId}/favorites/`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateFavoriteMutation, useGetFavoriteListQuery } = favoritesApi;
