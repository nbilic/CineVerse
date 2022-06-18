import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import socketReducer from "./socket";
import friendsReducer from "./friends";
import { getDefaultMiddleware } from "@reduxjs/toolkit";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
export default configureStore({
  reducer: {
    user: userReducer,
    socket: socketReducer,
    friends: friendsReducer,
  },
  middleware: customizedMiddleware,
});
