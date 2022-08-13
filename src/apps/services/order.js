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
  }),
});

export const { usePlaceOrderMutation } = orderApi;
