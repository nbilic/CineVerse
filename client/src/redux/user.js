import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logoutUser: (state) => {
      state.user = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
