import { configureStore } from "@reduxjs/toolkit";
import user from "./authSlice";
import posts from "./postSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: { user: user.reducer, posts: posts.reducer },
  
});

export type RootState = ReturnType<typeof store.getState>;
export const UseAppDispatch: () => typeof store.dispatch = useDispatch;
export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;
