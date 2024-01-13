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
   
  },
})

// Action creators are generated for each case reducer function
export const { setUserDetails } = UserSlice.actions

export default UserSlice.reducer