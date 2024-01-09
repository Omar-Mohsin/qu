import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: {
      reducer(state, action) {
        state.user = action.payload;
      },
    },
  },
});

export const SelectUser = (state) => {
  return state.auth.user;
};

export default authSlice.reducer;

export const { addUser } = authSlice.actions;
