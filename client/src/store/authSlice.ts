import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "../typing";

interface initialStateTypes {
  user: UserInterface | null;
  token: string | null;
}

const initialState: initialStateTypes = {
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<initialStateTypes | null>) => {
      if (action.payload !== null) {
        state.user = action.payload.user;
        state.token = action.payload.token;
      }
    },
  },
});

export default authSlice;

export const { setUser } = authSlice.actions;
