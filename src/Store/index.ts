import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import dogsReducer from "./dogsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dogs: dogsReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
