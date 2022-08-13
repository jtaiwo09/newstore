import { api } from "./api";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    products: build.query({
      query: () => "product",
      invalidatesTags: ["Products"],
    }),
    product: build.query({
      query: (id) => `product/${id}`,
      invalidatesTags: ["Products"],
    }),
    postReview: build.mutation({
      query: ({ id, data }) => ({
        url: `product/${id}/review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getProductReviews: build.query({
      query: (id) => `product/${id}/review`,
      invalidatesTags: ["Products"],
    }),
    placeOrder: build.mutation({
      query: (order) => ({
        url: "order",
        method: "POST",
        body: order,
      }),
      invalidatesTags: ["Products"],
    }),
    getOrder: build.query({
      query: (id) => `order/${id}`,
      invalidatesTags: ["Products"],
    }),
    payOrder: build.mutation({
      query: ({ id, data }) => ({
        url: `order/${id}/paid`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllOrders: build.query({
      query: () => "order",
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useProductsQuery,
  useProductQuery,
  usePlaceOrderMutation,
  useGetOrderQuery,
  usePayOrderMutation,
  useGetAllOrdersQuery,
  usePostReviewMutation,
  useGetProductReviewsQuery,
} = productApi;
