import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import socketReducer from "./socket";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
  },
  middleware: customizedMiddleware,
});
