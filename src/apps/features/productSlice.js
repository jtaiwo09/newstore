import { createSlice } from "@reduxjs/toolkit";
import { productApi } from "../services/product";

const productSlice = createSlice({
  name: "products",
  initialState: { products: [], order: {}, orderList: [], reviews: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        productApi.endpoints.products.matchFulfilled,
        (state, { payload }) => {
          state.products = payload;
        }
      )
      .addMatcher(
        productApi.endpoints.placeOrder.matchFulfilled,
        (state, { payload }) => {
          state.order = payload;
        }
      )
      .addMatcher(
        productApi.endpoints.payOrder.matchFulfilled,
        (state, { payload }) => {
          state.order = payload;
        }
      )
      .addMatcher(
        productApi.endpoints.getOrder.matchFulfilled,
        (state, { payload }) => {
          state.order = payload;
        }
      )
      .addMatcher(
        productApi.endpoints.getAllOrders.matchFulfilled,
        (state, { payload }) => {
          state.orderList = payload;
        }
      )
      .addMatcher(
        productApi.endpoints.postReview.matchFulfilled,
        (state, { payload }) => {
          console.log("Store", payload.data);
          state.reviews.push(...payload.data);
        }
      )
      .addMatcher(
        productApi.endpoints.getProductReviews.matchFulfilled,
        (state, { payload }) => {
          state.reviews = payload;
        }
      );
  },
});

export default productSlice.reducer;

export const { updateOrderOnPayment } = productSlice.actions;
