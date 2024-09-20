import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    shouldFetch: false,
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    fetchProducts: (state, action) => {
      state.shouldFetch = !state.shouldFetch;
    },
    addToCart: (state, action) => {
      if (action.payload === null) {
        state.cart.length = 0;
      } else {
        state.cart.push(action.payload);
      }
    },
    removeItemFromCart: (state, action) => {
      const index = state.cart.indexOf(action.payload);
      state.cart.splice(index, 1);
    },
  },
});

export const { addProduct, fetchProducts, addToCart, removeItemFromCart } = productSlice.actions;

export default productSlice.reducer;
