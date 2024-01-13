import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./UserSlice"

export const store = configureStore({
  reducer: {
    user : userReducer,  //managers any action related to slice- user
  },
})