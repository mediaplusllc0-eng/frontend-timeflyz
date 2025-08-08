import { api } from "@/utils/api2";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: "/profile",
        method: "GET",
      }),
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/customers/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetProfileQuery, useUpdateCustomerMutation } = authApi;
