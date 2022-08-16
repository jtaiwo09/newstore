import { api } from "./api";

export const orderApi = api.injectEndpoints({
  endpoints: (build) => ({
    placeOrder: build.mutation({
      query(item) {
        return {
          url: "order",
          method: "POST",
          body: item,
        };
      },
      invalidatesTags: ["Order"],
    }),
    purchased: build.mutation({
      query() {
        return {
          url: "order/purchased",
          method: "POST",
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { usePlaceOrderMutation, usePurchasedMutation } = orderApi;
