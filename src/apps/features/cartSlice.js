import { createSlice } from "@reduxjs/toolkit";
import { cartApi } from "../services/cart";

const initialState = {
  cart: [],
  shipping: {},
  payment: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      state.cart.push(payload);
    },
    removeFromCart: (state, { payload }) => {
      state.cart = state.cart.filter((product) => product._id !== payload.id);
    },
    setQuantity: (state, { payload }) => {
      state.cart.forEach((product) => {
        if (product._id == payload.id) {
          product.quantity = Number(payload.quantity);
          product.total = product.price * payload.quantity;
        }
      });
    },
    addPayment: (state, { payload }) => {
      state.payment = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        cartApi.endpoints.addShippingDetails.matchFulfilled,
        (state, { payload }) => {
          state.shipping = payload;
        }
      )
      .addMatcher(
        cartApi.endpoints.getShippingDetails.matchFulfilled,
        (state, { payload }) => {
          state.shipping = payload;
        }
      );
  },
});

export const { addToCart, removeFromCart, setQuantity, addPayment } =
  cartSlice.actions;

export default cartSlice.reducer;
