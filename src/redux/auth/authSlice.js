import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  userDetails: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = action.payload;
    },
    addUserDetails: (state, action) => {  
      state.userDetails = action.payload;
    }
  },
});

export const SelectUser = (state) => {
  return state.auth.user;
};

export const SelectUserDetails = (state) => {
  return state.auth.userDetails;
};

export default authSlice.reducer;

export const { addUser, removeUser , addUserDetails } = authSlice.actions;
