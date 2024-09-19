import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    shouldFetch: false,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products = action.payload;
    },
    fetchProducts: (state, action) => {
      state.shouldFetch = !state.shouldFetch;
    },
  },
});

export const { addProduct, fetchProducts } = productSlice.actions;

export default productSlice.reducer;
