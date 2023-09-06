import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostsInterface } from "../typing";

interface initialStateInterFace {
  posts: PostsInterface[] | null;
}

const initialState: initialStateInterFace = {
  posts: null,
};

export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<PostsInterface[] | null>) => {
      state.posts = action.payload;
    },
  },
});

export default postSlice;

export const { setPosts } = postSlice.actions;
