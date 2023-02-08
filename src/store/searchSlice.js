import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'SEARCH_INPUT',
  initialState: {
    value: 0,
    searchSelectedObj: "",
    inputObject: {},
    matchFilterStrict: null,
  },
  reducers: {
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
export const { searchSelectedObj, matchFilterStrict } = searchSlice.actions

export default searchSlice.reducer