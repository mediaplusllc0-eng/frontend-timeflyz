// features/auth/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: any | null;
}

const isClient = typeof window !== "undefined";

const initialState: AuthState = {
  token: isClient ? localStorage.getItem("token") : null,
  refreshToken: isClient ? localStorage.getItem("refreshToken") : null,
  user: isClient
    ? JSON.parse(localStorage.getItem("userData") || "null")
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<{ token: string; refreshToken: string; user: any }>
    ) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.user = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userData");
      }
    },
  },
});

export const { setAuthUser, logout } = authSlice.actions;
export default authSlice.reducer;
