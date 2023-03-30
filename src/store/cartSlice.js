import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "CART",
  initialState: {
    cart: 0,
    watchlist: {},
    list: [],
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    addToList: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addToWatchlist, addToList } = cartSlice.actions;

export default cartSlice.reducer;
