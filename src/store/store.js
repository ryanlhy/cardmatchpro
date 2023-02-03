import { configureStore } from '@reduxjs/toolkit'
import appReducer from './searchSlice'

export default configureStore({
  reducer: {
    searchInput: appReducer
  }
})