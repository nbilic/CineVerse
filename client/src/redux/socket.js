import { createSlice } from "@reduxjs/toolkit";

import { io } from "socket.io-client";

export const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: false,
  },
  reducers: {
    setSocket: (state) => {
      // CONNECT THE SOCKET
      state.socket = io("http://localhost:8080");
    },
  },
});

// Action creators are generated for each case reducer function
export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
