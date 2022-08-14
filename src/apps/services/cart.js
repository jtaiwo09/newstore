import { api } from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    addShippingDetails: build.mutation({
      query(data) {
        return {
          url: "shipping",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getShippingDetails: build.query({
      query() {
        return {
          url: "shipping",
          method: "GET",
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddShippingDetailsMutation, useGetShippingDetailsQuery } =
  cartApi;
