import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'SEARCH_INPUT',
  initialState: {
    value: 0,
    inputValue: "",
    inputObject: {}
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
    searchInputValue: (state, action) => {
      state.inputValue = action.payload
    },
    searchInputObject: (state, action) => {
      state.inputObject = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, searchInputValue } = searchSlice.actions

export default searchSlice.reducer