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
    removeFromList: (state, action) => {
      state.list = state.list.filter(
        (item) => item.itemId[0] !== action.payload.itemId[0]
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, addToWatchlist, addToList, removeFromList } =
  cartSlice.actions;

export default cartSlice.reducer;
