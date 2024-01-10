import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../typing";
import Cookies from "js-cookie";

interface initialStateTypes {
  user: UserInterface | null;
  token: string | null;
}
const initialUser = localStorage.getItem("user");
const initialState: initialStateTypes = {
  user: initialUser ? JSON.parse(initialUser) : null,
  token: Cookies.get("token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<initialStateTypes | null>) => {
      if (action.payload !== null) {
        state.user = action.payload.user;

        if (action.payload.token) {
          state.token = action.payload.token;
          Cookies.set("token", action.payload.token);
        }

        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload;
      } else {
        console.log("Friend  is not exist");
      }
    },
    setTokenFromCookie: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    Logout: (state) => {
      state.user = null
      state.token = null
    }
  },
});

export default authSlice;

export const { setUser, setFriends, setTokenFromCookie, Logout } = authSlice.actions;
