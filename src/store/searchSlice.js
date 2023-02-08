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
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
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
export const { increment, decrement, incrementByAmount, searchSelectedObj, matchFilterStrict } = searchSlice.actions

export default searchSlice.reducer