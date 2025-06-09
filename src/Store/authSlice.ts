import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  name: string;
  email: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  name: "",
  email: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.name = "";
      state.email = "";
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
