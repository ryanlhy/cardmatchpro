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
    saveDetails: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.uid = action.payload.uid;
      state.signup_date = action.payload.signup_date;
      state.signin_date = action.payload.signin_date;
      state.is_active = action.payload.is_active;
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveDetails } = userSlice.actions;

export default userSlice.reducer;
