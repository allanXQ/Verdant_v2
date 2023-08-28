import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import configReducer from "./features/app/configSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    config: configReducer,
  },
});
