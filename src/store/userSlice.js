import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "USER",
  initialState: {
    id: 0,
    name: "",
    email: "",
    address: "",
    uid: "",
    signup_date: "",
    signin_date: "",
    is_active: null,
  },
  reducers: {
    saveName: (state, action) => {
      state.name = action.payload;
    },
    saveEmail: (state, action) => {
      state.email = action.payload;
    },
    saveAddress: (state, action) => {
      state.address = action.payload;
    },
    saveUId: (state, action) => {
      state.uid = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveName, saveEmail, saveAddress, saveUId } = userSlice.actions;

export default userSlice.reducer;
