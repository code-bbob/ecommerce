import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./UserSlice"
import cartReducer from "./CartSlice"

export const store = configureStore({
  reducer: {
    user : userReducer,  //managers any action related to slice- user
    cart: cartReducer
  },
})