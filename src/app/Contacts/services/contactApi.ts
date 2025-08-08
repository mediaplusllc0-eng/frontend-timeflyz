import { api } from "@/utils/api2";

export const contactApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addContact: builder.mutation({
      query: ({ data }) => ({
        url: `/contacts`,
        method: "POST",
        body: { data },
      }),
      invalidatesTags: ["booking"],
    }),
  }),
  overrideExisting: false,
});

export const { useAddContactMutation } = contactApi;
