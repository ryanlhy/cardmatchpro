import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'SEARCH_INPUT',
  initialState: {
    value: 0,
    searchSelectedValue: "",
    searchSelectedObj: {},
    inputObject: {},
    matchFilterStrict: null,
  },
  reducers: {
    searchSelectedValue: (state, action) => {
      state.searchSelectedValue = action.payload
    },
    searchSelectedObj: (state, action) => {
      state.searchSelectedObj = action.payload
    },
    searchInputObject: (state, action) => {
      state.inputObject = action.payload
    },
    matchFilterStrict: (state, action) => {
      state.matchFilterStrict = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { searchSelectedValue, searchSelectedObj,searchInputObject, matchFilterStrict, } = searchSlice.actions

export default searchSlice.reducer