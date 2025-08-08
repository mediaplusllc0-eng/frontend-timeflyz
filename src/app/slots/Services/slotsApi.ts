import { api } from "@/utils/api2";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchHotels: builder.query({
      query: (filters: Record<string, string | undefined>) => {
        const cleanedParams: Record<string, string> = {};

        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== "") {
            cleanedParams[key] = value;
          }
        });

        return {
          url: `/hotels/search`,
          method: "GET",
          params: cleanedParams,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useSearchHotelsQuery } = authApi;
