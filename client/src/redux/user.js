import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      /* const { firstName, lastName, email, avatar, _id } = action.payload;
      state.user.firstName = firstName;
      state.user.lastName = lastName;
      state.user.email = email;
      state.user.avatar = avatar;
      state.user._id = _id; */
      state.user = { ...action.payload };
    },
    logoutUser: (state) => {
      state.user = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
