import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.value = action.payload
     },
     logoutUser :(state) => {
      state.value = null
      localStorage.removeItem("token")
       
     }
   
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails, logoutUser } = UserSlice.actions

export default UserSlice.reducer