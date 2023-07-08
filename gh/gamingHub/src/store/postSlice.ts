import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Post } from "../utils/types/post";
import { GhDataApi } from "../utils/axiosConfig";
import { getPostsEndpoint } from "../utils";
import { RootState } from "./store";

type PostState = {
  posts: Post[];
  loading: boolean;
  error: string | null;
};

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};

export const getAllPosts = createAsyncThunk(
  "postStore/getAllPosts",
  async () => {
    const response = await GhDataApi.get(getPostsEndpoint());
    return response.data;
  }
);

export const postSlice = createSlice({
  name: "postStore",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.push(action.payload);
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post;
        return post;
      });
      state.posts = updatedPosts;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllPosts.fulfilled,
        (state, action: PayloadAction<Post[]>) => {
          state.posts = action.payload;
          state.loading = false;
          state.error = null;
        }
      )
      .addCase(getAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setPost, setPosts, addPost } = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const postReducer = postSlice.reducer;
export default postReducer;
