import { createSlice } from "@reduxjs/toolkit";

export const friendsSlice = createSlice({
  name: "friends",
  initialState: {
    friends: [],
  },
  reducers: {
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    addNewFriendOnline: (state, action) => {
      state.friends = [...state.friends, action.payload];
    },
    removeFriendFromOnline: (state, action) => {
      state.friends = state.friends.filter((f) => f._id !== action.payload._id);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setFriends, addNewFriendOnline, removeFriendFromOnline } =
  friendsSlice.actions;

export default friendsSlice.reducer;
