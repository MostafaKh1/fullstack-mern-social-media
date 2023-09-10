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
    setPost: (state, action: PayloadAction<PostsInterface | null>) => {
      if (state.posts) {
        const updatePost = state.posts?.map((post) => {
          if (post._id === action.payload?._id) return action.payload;
          return post;
        });
        state.posts = updatePost;
      }
    },
  },
});

export default postSlice;

export const { setPosts, setPost } = postSlice.actions;
