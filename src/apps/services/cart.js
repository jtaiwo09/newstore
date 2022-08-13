import { api } from "./api";

export const cartApi = api.injectEndpoints({
  endpoints: (build) => ({
    addShippingDetails: build.mutation({
      query(data) {
        return {
          url: "order/shipping",
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: ["Cart"],
    }),
    getShippingDetails: build.query({
      query() {
        return {
          url: "order/shipping",
          method: "POST",
        };
      },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const { useAddShippingDetailsMutation, useGetShippingDetailsQuery } =
  cartApi;
