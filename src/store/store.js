import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    search: searchReducer,
    cart: cartReducer,
    user: userReducer,
  },
});
