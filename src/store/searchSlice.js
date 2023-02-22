import { createSlice } from '@reduxjs/toolkit'

export const searchSlice = createSlice({
  name: 'SEARCH_INPUT',
  initialState: {
    value: 0,
    searchSelectedValue: "",
    searchSelectedObj: {},
    inputObject: {},
    matchFilterStrict: "All",
    buttonGradeTags: [],
    displayFilteredCards: [],
    allCards: [],
    apiResponseData: {},
    isButtonFilterOn: false,
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
    },
    buttonGradeTags: (state, action) => {
      state.buttonGradeTags = action.payload
    },
    displayFilteredCards: (state, action) => {
      // access the value of the given key in the api response data
      state.displayFilteredCards = [...state.displayFilteredCards, ...action.payload]
      // state.displayFilteredCards = action.payload
    },
    removeFilteredCards: (state, action) => {
      state.displayFilteredCards = state.displayFilteredCards.filter((card) => !action.payload.includes(card))
    },
    allCards: (state, action) => {
      state.allCards = action.payload
    },
    apiResponseData: (state, action) => {
      state.apiResponseData = action.payload
    },
    isButtonFilterOn: (state, action) => {
      state.isButtonFilterOn = action.payload
    }



  }
})

// Action creators are generated for each case reducer function
export const { 
    searchSelectedValue, 
    searchSelectedObj,
    searchInputObject, 
    matchFilterStrict, 
    buttonGradeTags, 
    displayFilteredCards,
    removeFilteredCards, 
    allCards,
    apiResponseData,
    isButtonFilterOn
} = searchSlice.actions

export default searchSlice.reducer